import type { Config } from 'tailwindcss';
import { createPreset } from 'fumadocs-ui/tailwind-plugin';

/**
 * Docs visual language mirrors apps/web (shadcn-style slate neutrals,
 * Geist font, indigo/violet accent). Fumadocs ships a Tailwind preset
 * that plays nicely with its prose components — we extend it here so
 * brand tokens stay one file, not scattered across custom CSS.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './node_modules/fumadocs-ui/dist/**/*.js',
  ],
  presets: [createPreset({ preset: 'default' })],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist Variable', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Geist Mono Variable', 'ui-monospace', 'SF Mono', 'monospace'],
      },
      colors: {
        // Indigo brand accent — matches apps/web primary.
        primary: {
          DEFAULT: '#4f46e5',
          foreground: '#ffffff',
        },
      },
    },
  },
};

export default config;
