'use client';

import React from 'react';
import { useContent } from '@/context/ContentContext';
import { ProductCard } from '@/components/ProductCard';

export const NewArrivals: React.FC = () => {
  const { data } = useContent();
  const products = data.products || [];

  if (data.hiddenSections?.newArrivals || products.length === 0) return null;

  const header = data.sectionHeaders || {};

  return (
    <section id="new" className="py-16 md:py-20">
      <div className="wrap">
        <div className="section-head flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-11">
          <div>
            {header.newArrivalsBadge && (
              <span className="mono text-rose mb-2.5 block">{header.newArrivalsBadge}</span>
            )}
            <h2 className="font-display italic text-[clamp(30px,3.6vw,44px)]">
              {header.newArrivalsTitle || 'New arrivals'}
            </h2>
          </div>
          <p className="max-w-[380px] text-ink-soft text-[14.5px]">
            Real pieces, photographed as they are — explore what&apos;s currently available.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
