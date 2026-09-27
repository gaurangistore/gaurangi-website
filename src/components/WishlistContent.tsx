'use client';

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { useContent } from '@/context/ContentContext';
import { useWishlist } from '@/context/WishlistContext';

/**
 * Wishlist view.
 *
 * Lives apart from the route so `page.tsx` can stay a Server Component and
 * export `metadata`, which Next refuses to read from a client module.
 */
export const WishlistContent: React.FC = () => {
  const { data, isLoading } = useContent();
  const { itemIds, removeItem, clear } = useWishlist();

  // Ids are validated against live catalog data, so a product removed from the
  // CMS after it was saved is skipped instead of rendering a broken card.
  const products = (data.products || []).filter((product) => itemIds.includes(product.id));
  // Saved ids that no longer match a live product. Surfaced so the list can be
  // cleaned up instead of silently shrinking.
  const staleCount = Math.max(0, itemIds.length - products.length);

  return (
    <div className="min-h-screen bg-ivory text-ink flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="wrap pt-10 md:pt-14 pb-16 md:pb-24">
          <header className="mb-10 md:mb-14">
            <p className="eyebrow text-gold-ink mb-3">Saved pieces</p>
            <h1 className="font-display text-3xl md:text-4xl text-ink">Your wishlist</h1>
            <p className="text-ink-soft text-sm mt-3 max-w-[52ch]">
              {isLoading
                ? 'Loading your saved pieces…'
                : products.length > 0
                  ? `${products.length} ${products.length === 1 ? 'piece' : 'pieces'} saved on this device.`
                  : 'Nothing saved yet. Tap the heart on any piece to keep it here.'}
            </p>
            {staleCount > 0 && (
              <span className="block mt-2 text-[12px] text-ink-soft">
                {staleCount} saved {staleCount === 1 ? 'piece is' : 'pieces are'} no longer in the shop.{' '}
                <button type="button" onClick={clear} className="underline underline-offset-4">
                  Clear the list
                </button>
              </span>
            )}
          </header>

          {products.length > 0 && (
            <div className="flex justify-end mb-6">
              <button
                type="button"
                onClick={clear}
                className="mono text-[0.7rem] text-ink-soft hover:text-burgundy underline underline-offset-4 min-h-[44px] px-2"
              >
                Clear all
              </button>
            </div>
          )}

          {products.length > 0 ? (
            <div className="product-grid grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {products.map((product) => (
                <div key={product.id} className="relative">
                  <ProductCard product={product} />
                  <button
                    type="button"
                    onClick={() => removeItem(product.id)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-paper/90 border border-hairline text-ink flex items-center justify-center hover:text-burgundy transition-colors"
                    aria-label={`Remove ${product.name} from wishlist`}
                    title="Remove from wishlist"
                  >
                    <Heart size={15} fill="currentColor" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            !isLoading && (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center border border-dashed border-hairline bg-paper">
                <div className="w-20 h-20 rounded-full bg-taupe-soft flex items-center justify-center mb-6">
                  <Heart size={30} className="text-ink-soft" />
                </div>
                <h2 className="font-display italic text-2xl text-ink mb-2">No saved pieces yet</h2>
                <p className="text-ink-soft text-sm max-w-[380px] mb-8">
                  Save anything that catches your eye and it will wait for you here, on this device.
                </p>
                <Link href="/shop" className="btn-primary">
                  Browse the Shop
                </Link>
              </div>
            )
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
