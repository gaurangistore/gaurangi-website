'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { getImageUrl } from '@/lib/constants';

export const FeaturedCategories: React.FC = () => {
  const { data } = useContent();
  const categories = data.collections && data.collections.length > 0 ? data.collections : [];
  const headers = data.sectionHeaders || {};

  // Hide entire section if un-authored, hidden, or empty
  if (data.hiddenSections?.featuredCategories || categories.length === 0) return null;

  // Dynamic Grid Class generator based on items count for flawless layout balance
  const getGridColsClass = (count: number) => {
    if (count === 1) return 'grid-cols-1 max-w-md mx-auto';
    if (count === 2) return 'grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto';
    if (count === 4) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
  };

  const badge = headers.categoriesBadge !== undefined ? headers.categoriesBadge : 'Explore Weaves';
  const title = headers.categoriesTitle !== undefined ? headers.categoriesTitle : 'Featured Fabric Categories';
  const linkText = headers.categoriesLinkText !== undefined ? headers.categoriesLinkText : 'View All Dress Materials →';
  const linkUrl = headers.categoriesLinkUrl || '/dress-materials';

  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      {(badge || title || linkText) && (
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            {badge && badge.trim() !== '' && (
              <span className="text-[0.72rem] tracking-[0.3em] uppercase text-[#C5A059] font-medium block mb-2">
                {badge}
              </span>
            )}
            {title && title.trim() !== '' && (
              <h2 className="font-serif-editorial text-3xl md:text-4xl text-[#7A1C30] font-normal tracking-wide">
                {title}
              </h2>
            )}
          </div>

          {linkText && linkText.trim() !== '' && (
            <Link
              href={linkUrl}
              className="text-xs uppercase tracking-widest text-[#7A1C30] font-semibold hover:underline flex items-center gap-1 shrink-0"
            >
              {linkText}
            </Link>
          )}
        </div>
      )}

      {/* Grid of Visual Category Cards with Dynamic Responsive Grid */}
      <div className={`grid gap-8 ${getGridColsClass(categories.length)}`}>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/dress-materials?fabric=${encodeURIComponent(cat.title || '')}`}
            className="group relative overflow-hidden rounded-2xl bg-[#F3EFEA] border border-[#EAE5D9] transition-all duration-500 hover:shadow-xl block aspect-[4/5]"
          >
            {/* Image */}
            {cat.image && (
              <img
                src={getImageUrl(cat.image)}
                alt={cat.title || 'Fabric Category'}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
            )}
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

            {/* Top Tag / Count Badge */}
            {cat.tag && (
              <div className="absolute top-5 left-5 z-10">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[0.65rem] tracking-widest uppercase font-semibold text-[#7A1C30] border border-[#C5A059]/30">
                  {cat.tag}
                </span>
              </div>
            )}

            {/* Bottom Meta */}
            <div className="absolute bottom-6 left-6 right-6 z-10 text-white flex items-end justify-between">
              <div>
                {cat.title && (
                  <h3 className="font-serif-editorial text-2xl font-medium tracking-wide mb-1">
                    {cat.title}
                  </h3>
                )}
                {cat.subtitle && (
                  <p className="text-xs font-light text-[#FAF6EE]/80 font-sans line-clamp-2">
                    {cat.subtitle}
                  </p>
                )}
              </div>
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#7A1C30] group-hover:border-[#7A1C30]">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
