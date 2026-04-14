import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';
import './global.css';

export const metadata = {
  metadataBase: new URL('https://docs.kiket.dev'),
  title: {
    default: 'Kiket Docs',
    template: '%s · Kiket Docs',
  },
  description:
    "Documentation for Kiket — the compliance-first workflow automation platform.",
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
