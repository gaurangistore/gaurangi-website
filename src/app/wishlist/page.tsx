import type { Metadata } from 'next';
import { WishlistContent } from '@/components/WishlistContent';
import { SITE_NAME, absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Wishlist',
  description: `Pieces you have saved at ${SITE_NAME}. Return to them any time.`,
  alternates: { canonical: absoluteUrl('/wishlist') },
  // A personal, per-browser list; not useful in search results.
  robots: { index: false, follow: true },
};

export default function WishlistPage() {
  return <WishlistContent />;
}
