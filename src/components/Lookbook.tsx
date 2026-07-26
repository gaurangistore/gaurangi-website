'use client';

import React from 'react';

export const Lookbook: React.FC = () => {
  return (
    <section className="py-28 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Editorial Lookbook Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-[0.72rem] tracking-[0.35em] uppercase text-[#C5A059] font-medium block mb-2">
            Fashion Inspiration
          </span>
          <h3 className="font-serif-editorial text-3xl md:text-5xl text-[#7A1C30] font-normal tracking-wide">
            Featured Lookbook
          </h3>
        </div>
        <p className="text-xs md:text-sm font-light text-[#1F1F1F]/70 max-w-md font-sans leading-relaxed">
          Explore curated style stories photographed on location in heritage courtyards and contemporary architecture.
        </p>
      </div>

      {/* Magazine Layout Spread */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Main Large Editorial Image */}
        <div className="md:col-span-7 relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl group border border-[#EAE5D9]">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
            alt="Lookbook Editorial Main"
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <span className="text-[0.65rem] tracking-widest uppercase text-[#C5A059] block mb-1">
              Look 01 • Royal Velvet & Gold Zari
            </span>
            <h4 className="font-serif-editorial text-2xl md:text-3xl">The Heritage Silhouette</h4>
          </div>
        </div>

        {/* Secondary Editorial Spread Column */}
        <div className="md:col-span-5 flex flex-col gap-8">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group border border-[#EAE5D9]">
            <img
              src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop"
              alt="Lookbook Editorial Detail"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-[0.65rem] tracking-widest uppercase text-[#C5A059] block mb-1">
                Look 02 • Evening Grace
              </span>
              <h5 className="font-serif-editorial text-xl">Mulberry Silk Slip & Choker</h5>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#F3EFEA] border border-[#EAE5D9] flex flex-col gap-4">
            <span className="text-[0.68rem] tracking-[0.25em] uppercase text-[#C5A059] font-medium">
              Editorial Note
            </span>
            <blockquote className="font-serif-editorial text-xl md:text-2xl text-[#7A1C30] italic font-normal leading-snug">
              "Elegance is not about being noticed, it's about being remembered."
            </blockquote>
            <p className="text-xs text-gray-600 font-sans font-light leading-relaxed">
              Our autumn edits focus on hand-feel, rich drape, and effortless transition from dawn celebrations to moonlit dinners.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
