import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared layout config used by the home layout AND the /docs sidebar
 * layout. Keep the nav here so header links stay in lockstep across
 * surfaces.
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <span className="inline-flex items-center gap-2 font-semibold tracking-tight">
        <img src="/kiket-icon.svg" alt="" className="h-5 w-5" />
        Kiket docs
      </span>
    ),
    url: '/',
  },
  links: [
    { text: 'Get started', url: '/docs/start/quickstart' },
    { text: 'API', url: '/docs/api' },
    { text: 'Kiket.dev', url: 'https://kiket.dev', external: true },
    { text: 'GitHub', url: 'https://github.com/kiket-dev', external: true },
  ],
};
