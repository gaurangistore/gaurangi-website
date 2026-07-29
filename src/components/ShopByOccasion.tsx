'use client';

import React from 'react';
import { useContent } from '@/context/ContentContext';
import { getImageUrl } from '@/lib/constants';

export const ShopByOccasion: React.FC = () => {
  const { data } = useContent();
  const occasions = data.occasions && data.occasions.length > 0 ? data.occasions : [];

  if (occasions.length === 0) return null;

  return (
    <section id="occasions" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-16">
        <span className="text-[0.72rem] tracking-[0.3em] uppercase text-[#C5A059] font-medium block mb-2">
          Tailored Moments
        </span>
        <h3 className="font-serif-editorial text-3xl md:text-4xl text-[#7A1C30] font-normal tracking-wide">
          Shop by Occasion
        </h3>
        <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-4" />
      </div>

      {/* Grid Layout of Visual Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
        {occasions.map((occ, idx) => (
          <div
            key={idx}
            className={`group relative overflow-hidden rounded-2xl border border-[#EAE5D9] cursor-pointer ${occ.gridSpan || ''}`}
          >
            <img
              src={getImageUrl(occ.image)}
              alt={occ.title || 'Occasion'}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

            {/* Title & Subtitle Container */}
            <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
              {occ.title && (
                <h4 className="font-serif-editorial text-2xl md:text-3xl font-medium tracking-wide mb-1">
                  {occ.title}
                </h4>
              )}
              {occ.subtitle && (
                <p className="text-xs font-light text-[#FAF6EE]/80 font-sans">
                  {occ.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
