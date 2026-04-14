# Kiket docs

Source for [docs.kiket.dev](https://docs.kiket.dev).

```bash
pnpm install
pnpm dev        # http://localhost:3001
pnpm build      # static export to ./out
```

## Writing docs

MDX files live in `content/docs/<section>/<page>.mdx`. Each page needs frontmatter:

```mdx
---
title: Page title
description: One-liner shown in search and OG cards.
---
```

Sidebar order comes from `meta.json` in each folder — list pages in the order they should appear.

## Auto-synced pages

Integration, SDK, CLI, MCP, and industry-template pages are generated from their upstream READMEs during `prebuild`. Edit the upstream repo, not the generated MDX. To add a new source, extend `SOURCES` in `scripts/sync-submodule-readmes.mjs`.
