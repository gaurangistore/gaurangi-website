'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CollectionCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
}

const COLLECTIONS: CollectionCard[] = [
  {
    id: 'col-1',
    title: 'Wedding Collection',
    subtitle: 'Woven for grand celebrations and sacred vows.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
    tag: 'Haute Couture',
  },
  {
    id: 'col-2',
    title: 'Festive Splendor',
    subtitle: 'Vibrant silk weaves & intricate hand-embroidery.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop',
    tag: 'Artisanal Edit',
  },
  {
    id: 'col-3',
    title: 'Daily Elegance',
    subtitle: 'Breathable linen & lightweight organic cottons.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop',
    tag: 'Everyday Chic',
  },
  {
    id: 'col-4',
    title: 'Contemporary Formals',
    subtitle: 'Structured silhouettes for modern executive grace.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
    tag: 'Modern Tailoring',
  },
];

export const FeaturedCollections: React.FC = () => {
  return (
    <section id="collections" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-[0.72rem] tracking-[0.3em] uppercase text-[#C5A059] font-medium block mb-3">
          Explore Experience
        </span>
        <h3 className="font-serif-editorial text-3xl md:text-4xl text-[#7A1C30] font-normal tracking-wide">
          Curated Collections
        </h3>
        <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-4" />
      </div>

      {/* Grid of Large Editorial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {COLLECTIONS.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-2xl bg-[#F3EFEA] border border-[#EAE5D9] transition-all duration-500 hover:shadow-2xl"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Subtle Ambient Shadow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Top Tag */}
              <div className="absolute top-6 left-6 z-10">
                <span className="px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-md text-[0.68rem] tracking-widest uppercase font-semibold text-[#7A1C30] border border-[#C5A059]/30">
                  {item.tag}
                </span>
              </div>

              {/* Bottom Editorial Text */}
              <div className="absolute bottom-8 left-6 right-6 z-10 text-white flex items-end justify-between">
                <div>
                  <h4 className="font-serif-editorial text-2xl md:text-3xl font-medium tracking-wide mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs md:text-sm font-light text-[#FAF6EE]/80 max-w-sm">
                    {item.subtitle}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#7A1C30] group-hover:border-[#7A1C30]">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
