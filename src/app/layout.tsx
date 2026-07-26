import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gaurangi Fashions | Luxury Modern Ethnic Boutique',
  description: 'A premium digital fashion boutique where every collection tells a story. Explore curated ethnic weaves, designer ensembles, and timeless luxury.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts: Cormorant Garamond for Editorial Serif, Plus Jakarta Sans for Body */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF6EE] text-[#1F1F1F] font-sans antialiased selection:bg-[#7A1C30] selection:text-white">
        {children}
      </body>
    </html>
  );
}
