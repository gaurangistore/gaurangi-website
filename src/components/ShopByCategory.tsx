'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useContent } from '@/context/ContentContext';
import { getImageUrl, DUMMY_IMAGE } from '@/lib/constants';

export const ShopByCategory: React.FC = () => {
  const { data } = useContent();
  const products = data.products || [];
  const header = data.sectionHeaders || {};

  const authoredCategories = data.categories || [];
  const hasAuthored = authoredCategories.length > 0;

  const autoCategories = useMemo(() => {
    if (hasAuthored) return [];
    const map = new Map<string, { image: string }>();
    products.forEach((p) => {
      if (!p.category) return;
      if (!map.has(p.category)) {
        map.set(p.category, { image: p.image });
      }
    });
    return Array.from(map.entries()).map(([name, meta]) => ({
      id: name,
      name,
      image: meta.image,
    }));
  }, [products, hasAuthored]);

  const categories = hasAuthored ? authoredCategories : autoCategories;

  if (data.hiddenSections?.featuredCategories) return null;
  if (categories.length === 0) return null;

  return (
    <section id="categories" className="py-16 md:py-20">
      <div className="wrap">
        <div className="section-head mb-10 md:mb-11">
          {header.categoriesBadge && (
            <span className="mono text-gold-ink mb-2.5 block">{header.categoriesBadge}</span>
          )}
          <h2 className="font-display italic text-[clamp(30px,3.6vw,44px)] max-w-[560px]">
            {header.categoriesTitle || 'Find your piece'}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="category-card group bg-paper border border-hairline overflow-hidden transition-transform duration-200 hover:-translate-y-[3px] hover:shadow-[0_12px_24px_-14px_rgba(36,16,25,0.3)]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-taupe-soft">
                <img
                  src={getImageUrl(cat.image || DUMMY_IMAGE)}
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
