#!/usr/bin/env node
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sanitizeLegacyContent } from './readme-sanitize.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_ROOT = resolve(__dirname, '..');
const SIBLING_ROOT = resolve(DOCS_ROOT, '..');

/** Shipped evidence adapter submodules only — hand-authored *-adapter.mdx pages are canonical. */
const EXTENSION_SOURCES = ['github', 'slack', 'webhook', 'jira', 'servicenow'].map((slug) => ({
  localPath: `extensions/${slug}`,
  repo: `kiket-dev/kiket-ext-${slug}`,
  output: `content/docs/integrations/${slug}-readme.mdx`,
  description: `${titleCase(slug)} extension README (auto-synced).`,
}));

const SOURCES = [
  ...EXTENSION_SOURCES,

  {
    localPath: 'sdk/nodejs',
    repo: 'kiket-dev/kiket-nodejs-sdk',
    output: 'content/docs/api/sdk/nodejs.mdx',
    label: 'Node.js',
    description: 'Kiket Node.js SDK.',
  },
  {
    localPath: 'sdk/python',
    repo: 'kiket-dev/kiket-python-sdk',
    output: 'content/docs/api/sdk/python.mdx',
    label: 'Python',
    description: 'Kiket Python SDK.',
  },
  {
    localPath: 'sdk/ruby',
    repo: 'kiket-dev/kiket-ruby-sdk',
    output: 'content/docs/api/sdk/ruby.mdx',
    label: 'Ruby',
    description: 'Kiket Ruby SDK.',
  },
  {
    localPath: 'sdk/java',
    repo: 'kiket-dev/kiket-java-sdk',
    output: 'content/docs/api/sdk/java.mdx',
    label: 'Java',
    description: 'Kiket Java SDK.',
  },
  {
    localPath: 'sdk/dotnet',
    repo: 'kiket-dev/kiket-dotnet-sdk',
    output: 'content/docs/api/sdk/dotnet.mdx',
    label: '.NET',
    description: 'Kiket .NET SDK.',
  },
  {
    localPath: 'sdk/go',
    repo: 'kiket-dev/kiket-go-sdk',
    output: 'content/docs/api/sdk/go.mdx',
    label: 'Go',
    description: 'Kiket Go SDK.',
  },
];

function titleCase(s) {
  return s
    .split(/[-_ ]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/** Maintainer script: reject paths that escape an expected root (static SOURCES only). */
function assertResolvedWithin(rootDir, targetPath) {
  const root = resolve(rootDir);
  const target = resolve(targetPath);
  if (target !== root && !target.startsWith(`${root}/`)) {
    throw new Error(`Refusing path outside ${root}: ${targetPath}`);
  }
  return target;
}

const BANNER = '{/* AUTO-SYNCED from the upstream README. Edit the source repo, not this file. */}\n';

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function readReadme(src) {
  const local = assertResolvedWithin(SIBLING_ROOT, join(SIBLING_ROOT, src.localPath, 'README.md'));
  if (await exists(local)) return readFile(local, 'utf8');

  const res = await fetch(`https://api.github.com/repos/${src.repo}/readme`, {
    headers: { Accept: 'application/vnd.github.raw', 'User-Agent': 'kiket-docs-sync' },
  });
  if (!res.ok) throw new Error(`GitHub ${res.status} for ${src.repo}`);
  return res.text();
}

function stripH1(md) {
  return md.replace(/^#\s+[^\n]*\n+/, '');
}

async function main() {
  const results = await Promise.allSettled(
    SOURCES.map(async (src) => {
      const content = await readReadme(src);
      const title = src.label ?? titleCase(src.localPath.split('/').pop());
      const body = [
        '---',
        `title: ${title}`,
        `description: ${src.description}`,
        '---',
        '',
        BANNER,
        sanitizeLegacyContent(stripH1(content)),
      ].join('\n');
      const out = assertResolvedWithin(DOCS_ROOT, join(DOCS_ROOT, src.output));
      await mkdir(dirname(out), { recursive: true });
      await writeFile(out, body, 'utf8');
      return src.output;
    }),
  );

  let ok = 0,
    failed = 0;
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    const src = SOURCES[i];
    if (r.status === 'fulfilled') {
      ok++;
      console.log(`  ✓ ${src.repo} → ${r.value}`);
    } else {
      failed++;
      console.error(`  ✗ ${src.repo} — ${r.reason.message}`);
    }
  }
  console.log(`\nSynced ${ok} READMEs. ${failed} missing.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
