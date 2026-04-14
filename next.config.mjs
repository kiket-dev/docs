import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  // Static export for GitHub Pages. Runtime features (ISR, server actions,
  // middleware) are off — the docs site is fully static, rebuilt on push.
  output: 'export',
  images: { unoptimized: true },
  // Custom domain (docs.kiket.dev) serves at root; no basePath needed.
  // If we ever serve under /docs instead, set basePath: '/docs' here.
  reactStrictMode: true,
  trailingSlash: true,
};

export default withMDX(config);
