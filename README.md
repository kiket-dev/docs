# Kiket docs site

Source for [docs.kiket.dev](https://docs.kiket.dev) — public product and integration documentation (Fumadocs / Next.js static export).

## Role in the monorepo

Separate app under `docs-site/`. Product-facing guides in `docs/compliance/` sync here via `pnpm sync:compliance-docs`. Submodule READMEs (CLI, MCP, SDK) can be ingested at prebuild — see `scripts/sync-submodule-readmes.mjs` in the docs-site package.

## Layout

```
docs-site/
  content/docs/    MDX pages (section folders + meta.json for sidebar order)
  app/             Next.js app router
  scripts/         Prebuild sync helpers
```

## Commands

```bash
pnpm --filter @kiket/docs dev        # http://localhost:3001
pnpm --filter @kiket/docs build      # static export to ./out
pnpm sync:compliance-docs            # from repo root — copy docs/compliance/
```

## Writing docs

MDX files live in `content/docs/<section>/<page>.mdx`. Each page needs frontmatter:

```mdx
---
title: Page title
description: One-liner shown in search and OG cards.
---
```

Sidebar order comes from `meta.json` in each folder.

## Related docs

- [Docs-site operations](../docs/guides/docs-site.md)
- [Compliance source docs](../docs/compliance/README.md)
- [Folder README convention](../docs/guides/folder-readmes.md)
