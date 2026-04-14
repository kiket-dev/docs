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
        <span className="inline-block h-5 w-5 rounded bg-gradient-to-br from-indigo-600 to-fuchsia-500" aria-hidden="true" />
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
