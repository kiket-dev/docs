#!/usr/bin/env node
/**
 * Pull README.md from each extension / SDK / CLI submodule and drop
 * it into content/docs/ as an MDX page with a light frontmatter
 * wrapper.
 *
 * Security policy — this script runs in the docs-site repo (public)
 * and is never trusted with credentials that could reach the private
 * kiket2 monorepo. Two resolution modes:
 *
 *   1. Local filesystem — ../<path>/README.md. Only used when the dev
 *      is running inside the kiket2 checkout. CI never sees this path.
 *   2. GitHub REST API, UNAUTHENTICATED — fetches /readme from each
 *      public upstream repo (kiket-dev/kiket-ext-<slug>, etc.). Any
 *      repo that isn't public is silently skipped. No tokens are
 *      sent, even if GITHUB_TOKEN is in scope.
 *
 * Generated files are marked with a banner comment so manual edits
 * are obvious mistakes. Real edits belong in the upstream repo.
 */
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_ROOT = resolve(__dirname, '..');
const MONOREPO_ROOT = resolve(DOCS_ROOT, '..');

// Each source: where it lives locally + where to write the resulting MDX.
const SOURCES = [
  // Extensions (14)
  { kind: 'extension', slug: 'slack' },
  { kind: 'extension', slug: 'teams' },
  { kind: 'extension', slug: 'zoom' },
  { kind: 'extension', slug: 'twilio' },
  { kind: 'extension', slug: 'github' },
  { kind: 'extension', slug: 'gitlab' },
  { kind: 'extension', slug: 'bitbucket' },
  { kind: 'extension', slug: 'jira' },
  { kind: 'extension', slug: 'google-oauth' },
  { kind: 'extension', slug: 'microsoft-oauth' },
  { kind: 'extension', slug: 'google-calendar' },
  { kind: 'extension', slug: 'microsoft-calendar' },
  { kind: 'extension', slug: 'mailjet-inbound' },
  { kind: 'extension', slug: 'time-tracking' },
  // SDKs (6)
  { kind: 'sdk', slug: 'nodejs', label: 'Node.js' },
  { kind: 'sdk', slug: 'python', label: 'Python' },
  { kind: 'sdk', slug: 'ruby', label: 'Ruby' },
  { kind: 'sdk', slug: 'java', label: 'Java' },
  { kind: 'sdk', slug: 'dotnet', label: '.NET' },
  { kind: 'sdk', slug: 'go', label: 'Go' },
  // CLI
  { kind: 'cli', slug: 'cli', label: 'CLI' },
];

function titleCase(s) {
  return s
    .split(/[-_ ]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function localPathFor({ kind, slug }) {
  if (kind === 'extension') return join(MONOREPO_ROOT, 'extensions', slug, 'README.md');
  if (kind === 'sdk') return join(MONOREPO_ROOT, 'sdk', slug, 'README.md');
  if (kind === 'cli') return join(MONOREPO_ROOT, 'cli', 'README.md');
  throw new Error(`unknown kind: ${kind}`);
}

function outputPathFor({ kind, slug }) {
  if (kind === 'extension') return join(DOCS_ROOT, 'content', 'docs', 'integrations', `${slug}.mdx`);
  if (kind === 'sdk') return join(DOCS_ROOT, 'content', 'docs', 'api', 'sdk', `${slug}.mdx`);
  if (kind === 'cli') return join(DOCS_ROOT, 'content', 'docs', 'api', 'cli.mdx');
  throw new Error(`unknown kind: ${kind}`);
}

const BANNER =
  '{/* AUTO-SYNCED from the upstream submodule README. Do not edit here — edit the source repo. */}\n';

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function readReadme(src) {
  const local = localPathFor(src);
  if (await exists(local)) return readFile(local, 'utf8');
  // CI path — fetch via GitHub REST API. No git clone, no SSH keys.
  return fetchReadmeFromGitHub(src);
}

function repoFor({ kind, slug }) {
  // Source of truth: the monorepo's .gitmodules. When it isn't
  // available (standalone docs-site CI), fall back to the known
  // kiket-dev naming conventions.
  try {
    const modules = execSync(`git config --file ${join(MONOREPO_ROOT, '.gitmodules')} --get-regexp url`, {
      encoding: 'utf8',
    });
    const path = kind === 'extension' ? `extensions/${slug}` : kind === 'sdk' ? `sdk/${slug}` : 'cli';
    const line = modules.split('\n').find((l) => l.includes(`submodule."${path}".url`));
    const url = line ? line.split(' ').slice(1).join(' ').trim() : null;
    const parsed = url ? parseGithubRepo(url) : null;
    if (parsed) return parsed;
  } catch {
    /* fall through to pattern */
  }
  if (kind === 'extension') return { owner: 'kiket-dev', repo: `kiket-ext-${slug}` };
  if (kind === 'sdk') return { owner: 'kiket-dev', repo: `kiket-${slug}-sdk` };
  if (kind === 'cli') return { owner: 'kiket-dev', repo: 'kiket-cli' };
  return null;
}

/** Parse `git@github.com:org/repo.git` or `https://github.com/org/repo.git` into { owner, repo }. */
function parseGithubRepo(url) {
  const m = url.match(/github\.com[:/]([^/]+)\/(.+?)(?:\.git)?$/);
  return m ? { owner: m[1], repo: m[2] } : null;
}

async function fetchReadmeFromGitHub(src) {
  const target = repoFor(src);
  if (!target) return null;
  const { owner, repo } = target;
  // Contents API `/readme` returns the default-branch README regardless
  // of case/location. Intentionally UNAUTHENTICATED — if a repo is
  // private, we want the fetch to fail rather than quietly leak a
  // scoped token to a surface that could be compromised.
  const url = `https://api.github.com/repos/${owner}/${repo}/readme`;
  const headers = { Accept: 'application/vnd.github.raw', 'User-Agent': 'kiket-docs-sync' };
  try {
    const res = await fetch(url, { headers });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function stripH1(md) {
  // Drop the leading `# Title` line so the frontmatter title isn't
  // duplicated when Fumadocs renders the MDX body.
  return md.replace(/^#\s+[^\n]*\n+/, '');
}

async function main() {
  let ok = 0;
  let missing = 0;
  for (const src of SOURCES) {
    const content = await readReadme(src);
    if (!content) {
      missing++;
      console.warn(`  ✗ ${src.kind}/${src.slug} — README not found (skipping)`);
      continue;
    }
    const title = src.label ?? titleCase(src.slug);
    const description =
      src.kind === 'extension'
        ? `${title} integration for Kiket.`
        : src.kind === 'sdk'
          ? `Kiket ${title} SDK.`
          : 'Kiket command-line interface.';

    const body = [
      '---',
      `title: ${title}`,
      `description: ${description}`,
      '---',
      '',
      BANNER,
      stripH1(content),
    ].join('\n');

    const out = outputPathFor(src);
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, body, 'utf8');
    ok++;
    console.log(`  ✓ ${src.kind}/${src.slug} → ${out.replace(DOCS_ROOT + '/', '')}`);
  }
  console.log(`\nSynced ${ok} READMEs, ${missing} missing.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
