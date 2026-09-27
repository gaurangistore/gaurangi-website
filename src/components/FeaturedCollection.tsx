'use client';

import React from 'react';
import Link from 'next/link';
import { useContent } from '@/context/ContentContext';
import { getImageUrl, DUMMY_IMAGE } from '@/lib/constants';
import { PriceTag } from '@/components/PriceTag';

/**
 * Featured collection.
 *
 * A single spotlight rather than a grid, so the homepage has one clear focal
 * point between the listing sections. Falls back to the first in-stock product
 * when no collection is authored, so the section always has something to show
 * instead of rendering an empty frame.
 */
export const FeaturedCollection: React.FC = () => {
  const { data } = useContent();
  const header = data.sectionHeaders || {};
  const collections = data.collections || [];
  const products = data.products || [];

  const spotlight = collections[0];
  // Resolve to a live product so the panel can show real price and a real link.
  const product = spotlight
    ? products.find((p) => p.id === spotlight.id) || products[0]
    : products[0];

  if (!spotlight && !product) return null;

  return (
    <section id="featured" className="py-16 md:py-20">
      <div className="wrap">
        <div className="bg-paper border border-hairline grid grid-cols-1 lg:grid-cols-2">
          <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[480px] overflow-hidden bg-taupe-soft">
            <img
              src={getImageUrl(spotlight?.image || product?.image || DUMMY_IMAGE)}
              alt={spotlight?.title || product?.name || 'Featured collection'}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            {spotlight?.tag && (
              <span className="absolute top-4 left-4 mono text-[0.62rem] text-ink bg-paper/92 px-3 py-1.5">
                {spotlight.tag}
              </span>
            )}
          </div>

          <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
            {header.featuredCollectionBadge && (
              <span className="mono text-gold-ink mb-3 block">{header.featuredCollectionBadge}</span>
            )}
            <h2 className="font-display italic text-[clamp(28px,3.4vw,40px)] mb-4">
              {spotlight?.title || header.featuredCollectionTitle || 'This season’s focus'}
            </h2>
            <p className="text-ink-soft text-[15px] leading-relaxed max-w-[46ch] mb-7">
              {spotlight?.subtitle ||
                header.featuredCollectionBody ||
                'One collection we are putting the most work into.'}
            </p>

            {product && (
              <div className="flex flex-wrap items-baseline gap-3 mb-8">
                <span className="mono text-[11px] text-ink-soft">{product.name}</span>
                <PriceTag product={product} className="text-base" />
              </div>
            )}

            <div className="flex flex-wrap gap-2.5">
              <Link
                href={product ? `/product?id=${encodeURIComponent(product.id)}` : '/shop'}
                className="btn-primary"
              >
                View the piece
              </Link>
              <Link href="/shop" className="btn-outline">
                Shop everything
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
