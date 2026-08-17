'use client';

import React from 'react';
import Link from 'next/link';
import { useContent } from '@/context/ContentContext';
import { getImageUrl } from '@/lib/constants';

export const ShopByCategory: React.FC = () => {
  const { data } = useContent();
  const products = data.products || [];

  if (data.hiddenSections?.featuredCategories || products.length === 0) return null;

  const header = data.sectionHeaders || {};

  // Extract unique categories with product count and first product image
  const categoryMap = new Map<string, { count: number; image: string }>();
  products.forEach((p) => {
    if (!p.category) return;
    const existing = categoryMap.get(p.category);
    if (existing) {
      existing.count += 1;
    } else {
      categoryMap.set(p.category, { count: 1, image: p.image });
    }
  });

  const categories = Array.from(categoryMap.entries()).map(([name, meta]) => ({
    name,
    count: meta.count,
    image: meta.image,
  }));

  if (categories.length === 0) return null;

  return (
    <section id="categories" className="py-16 md:py-20">
      <div className="wrap">
        <div className="section-head flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-11">
          <div>
            {header.categoriesBadge && (
              <span className="mono text-rose mb-2.5 block">{header.categoriesBadge}</span>
            )}
            <h2 className="font-display italic text-[clamp(30px,3.6vw,44px)] max-w-[560px]">
              {header.categoriesTitle || 'Find your piece'}
            </h2>
          </div>
          <p className="max-w-[380px] text-ink-soft text-[14.5px]">
            Suit sets, dupattas and home textiles — every piece built on hand-cut Pipili appliqué.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="category-card group bg-paper border border-border-hair overflow-hidden transition-transform duration-200 hover:-translate-y-[3px] hover:shadow-[0_12px_24px_-14px_rgba(36,16,25,0.3)]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#EFE3DC]">
                <img
                  src={getImageUrl(cat.image)}
                  alt={cat.name}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4 md:p-5 text-center">
                <h3 className="text-base font-sans font-semibold">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
