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
- Future: pull extension/SDK READMEs in a CI pre-step and render them under `/docs/integrations/*` and `/docs/api/sdk/*`.
