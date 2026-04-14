# Kiket docs

Next.js + [Fumadocs](https://fumadocs.vercel.app) powering [docs.kiket.dev](https://docs.kiket.dev).

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3001
```

## Build

```bash
pnpm build      # static export to ./out
```

The site is a pure static export (`next.config.mjs` sets `output: 'export'`). No server runtime; deploys to GitHub Pages via `.github/workflows/deploy.yml`.

## Content

MDX files live in `content/docs/<section>/<page>.mdx`. Navigation comes from `meta.json` in each folder — list the pages in the order you want them to appear.

Each page uses frontmatter:

```mdx
---
title: Page title
description: Short one-liner surfaced in search and OG cards.
---
```

## Domain + DNS

- Custom domain: `docs.kiket.dev` (see `public/CNAME`).
- Cloudflare DNS: `CNAME docs → kiket-dev.github.io`. Start as **DNS only** so GitHub's Let's Encrypt issuer sees the real origin; flip to **Proxied** once the cert is green.
- Zone SSL/TLS must be **Full (strict)**.

## Architecture

- Visual language mirrors `apps/web` — Geist variable fonts, slate neutrals, indigo accent.
- Single source of truth for content; nothing is generated at runtime.
- Extension / SDK / CLI READMEs are pulled in the `prebuild` step from their public upstream repos. See `scripts/sync-submodule-readmes.mjs`.

## Security policy: isolation from the private monorepo

This repository is **public**; the `kiket-dev/kiket2` monorepo is **private**. The docs build must never be able to reach kiket2 — not via git clone, not via GitHub API with a token, not via an SSH key.

The sync script enforces this:

- Local filesystem reads only work from a sibling checkout in a dev machine (e.g. the maintainer has kiket2 cloned next to docs-site). CI never has that path available.
- GitHub REST API calls are **intentionally unauthenticated**. Private repos are silently skipped rather than accessed with a fallback token that could leak.
- The GitHub Actions workflow does not set `GITHUB_TOKEN` or any PAT on the sync step, and does not `actions/checkout` kiket2 as a sibling.

If an upstream submodule repo needs to stay private, its README cannot be surfaced here. Make the repo public or host the docs content in-tree.
