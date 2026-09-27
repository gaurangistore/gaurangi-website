import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Noto_Sans } from 'next/font/google';
import './globals.css';
import { ContentProvider } from '@/context/ContentContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AuthProvider } from '@/context/AuthContext';
import { SITE_URL, SITE_NAME, BRAND_TAGLINE } from '@/lib/seo';

// Playfair Display carries the editorial voice (hero + section headings).
// Noto Sans covers all product/UI text and includes Devanagari so Indian
// language support can be added later without a second font stack.
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const notoSans = Noto_Sans({
  subsets: ['latin', 'devanagari'],
  display: 'swap',
  variable: '--font-noto',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Crafted Indian Fashion & Lifestyle`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Discover thoughtfully crafted sarees, dress materials, home textiles and more at Gaurangi Collection — inspired by Indian textile traditions and styled for today.",
  keywords: [
    'crafted Indian fashion',
    'sarees',
    'dress materials',
    'suits and dress sets',
    'dupattas',
    'home textiles',
    'Indian textile heritage',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_IN',
    title: `${SITE_NAME} | Crafted Indian Fashion & Lifestyle`,
    description:
      "Discover thoughtfully crafted sarees, dress materials, home textiles and more at Gaurangi Collection — inspired by Indian textile traditions and styled for today.",
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Crafted Indian Fashion & Lifestyle`,
    description: BRAND_TAGLINE,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F8F4ED',
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  slogan: BRAND_TAGLINE,
  description:
    "Gaurangi Collection brings together thoughtfully crafted fashion and lifestyle collections inspired by India's rich textile heritage and styled for today.",
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/shop?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${playfair.variable} ${notoSans.variable}`}>
      <body className="bg-ivory text-ink font-sans antialiased">
        <script
          type="application/ld+json"
          // Organization + WebSite structured data. Static because the site is
          // exported at build time; admin-authored OG image is layered on client.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <AuthProvider>
          <ContentProvider>
            {/* Cart and Wishlist both read product data, so they sit inside
                ContentProvider. Wishlist nests inside Cart so cart totals and
                saved pieces are always rendered from one consistent catalog. */}
            <CartProvider>
              <WishlistProvider>{children}</WishlistProvider>
            </CartProvider>
          </ContentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
