import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';
import { docs, meta } from '@/.source';

/**
 * Single content-loader instance consumed by the catch-all docs route
 * and the Fumadocs search/tree helpers. Content lives under
 * content/docs/ — one file per page, optional _meta.json per folder
 * for nav ordering.
 */
export const source = loader({
  baseUrl: '/docs',
  source: createMDXSource(docs, meta),
});
