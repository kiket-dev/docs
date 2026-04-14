import { defineDocs, defineConfig } from 'fumadocs-mdx/config';

export const { docs, meta } = defineDocs({
  dir: 'content/docs',
});

export default defineConfig({
  mdxOptions: {
    // Add remark/rehype plugins here as the docs grow — for now the
    // Fumadocs defaults (autolink, GFM tables, syntax highlighting)
    // cover every page.
  },
});
