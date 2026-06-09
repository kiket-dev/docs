import { loader } from 'fumadocs-core/source';
import { docs } from '@/.source/server';

/**
 * Single content-loader instance consumed by the catch-all docs route
 * and the Fumadocs search/tree helpers. Content lives under
 * content/docs/ — one file per page, optional meta.json per folder
 * for nav ordering.
 */
export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});
