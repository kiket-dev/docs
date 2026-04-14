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

Deploys to GitHub Pages via `.github/workflows/deploy.yml`.

## Content

MDX files live in `content/docs/<section>/<page>.mdx`. Navigation comes from `meta.json` in each folder.

Extension, SDK, CLI, MCP, and industry-template pages are auto-synced from their upstream READMEs by `scripts/sync-submodule-readmes.mjs` during `prebuild`. To add a new one, add an entry to `SOURCES` in that script.

## DNS

- Custom domain: `docs.kiket.dev` (`public/CNAME`).
- Cloudflare: `CNAME docs → kiket-dev.github.io`, DNS-only until GitHub issues the cert, then Proxied. Zone SSL/TLS: Full (strict).
