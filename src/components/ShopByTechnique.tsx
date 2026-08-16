'use client';

import React from 'react';
import Link from 'next/link';
import { useContent } from '@/context/ContentContext';
import { TechniqueIcon } from '@/components/TechniqueIcon';

export const ShopByTechnique: React.FC = () => {
  const { data } = useContent();
  const techniques = data.collections || [];

  if (data.hiddenSections?.featuredCategories || techniques.length === 0) return null;

  const header = data.sectionHeaders || {};

  return (
    <section id="motifs" className="py-16 md:py-20">
      <div className="wrap">
        <div className="section-head flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-11">
          <div>
            {header.categoriesBadge && (
              <span className="mono text-rose mb-2.5 block">{header.categoriesBadge}</span>
            )}
            <h2 className="font-display italic text-[clamp(30px,3.6vw,44px)] max-w-[560px]">
              {header.categoriesTitle || 'Shop by technique'}
            </h2>
          </div>
          <p className="max-w-[380px] text-ink-soft text-[14.5px]">
            These are the actual appliqué styles in our current stock — not a mood board. Pick a
            technique, then see it across suit sets, dupattas and home textiles.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-[18px]">
          {techniques.map((technique) => (
            <Link
              key={technique.id}
              href={`/shop?technique=${technique.id}`}
              className="motif-card bg-paper text-center p-6 md:p-6 px-4 py-5 transition-transform duration-200 hover:-translate-y-[5px] hover:shadow-[0_14px_26px_-18px_rgba(36,16,25,0.35)]"
            >
              <TechniqueIcon
                technique={technique.id}
                className="w-16 h-16 mx-auto mb-3.5 text-ink"
              />
              <h3 className="text-base font-sans font-semibold">{technique.title}</h3>
              {technique.tag && (
                <span className="mono text-ink-soft mt-1 text-[10px] block">{technique.tag}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
