import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ContentProvider } from '@/context/ContentContext';

export const metadata: Metadata = {
  title: 'Gaurangi — Modern Appliqué, Worn Today',
  description: 'Contemporary womenswear and home textiles built on hand-cut appliqué — suit sets, dupattas and bedding, for the woman who wears heritage her own way.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Italiana&family=Work+Sans:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-canvas text-ink font-sans antialiased selection:bg-rose selection:text-paper">
        <ContentProvider>{children}</ContentProvider>
      </body>
    </html>
  );
}
