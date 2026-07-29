'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { DUMMY_IMAGE, getImageUrl } from '@/lib/constants';

interface FabricCategory {
  id: string;
  name: string;
  count: string;
  subtitle: string;
  image: string;
  fabricQuery: string;
}

const FABRIC_CATEGORIES: FabricCategory[] = [
  {
    id: 'cat-silk',
    name: 'Pure Silk',
    count: '42 Styles',
    subtitle: 'Lustrous Kanjivaram & Mulberry Silk Unstitched Fabrics',
    image: '/images/model-dummy.jpg',
    fabricQuery: 'Silk',
  },
  {
    id: 'cat-organza',
    name: 'Organza',
    count: '34 Styles',
    subtitle: 'Ethereal Sheer Organza with Hand Floral Embroidery',
    image: '/images/model-dummy.jpg',
    fabricQuery: 'Organza',
  },
  {
    id: 'cat-banarasi',
    name: 'Banarasi Silk',
    count: '28 Styles',
    subtitle: 'Heritage Zari Borders Woven by Master Artisans',
    image: '/images/model-dummy.jpg',
    fabricQuery: 'Banarasi',
  },
  {
    id: 'cat-chanderi',
    name: 'Chanderi',
    count: '22 Styles',
    subtitle: 'Lightweight Royal Weaves with Gold Motif Threading',
    image: '/images/model-dummy.jpg',
    fabricQuery: 'Chanderi',
  },
  {
    id: 'cat-linen',
    name: 'Linen & Cottons',
    count: '38 Styles',
    subtitle: 'Breathable Organic Linens for Everyday Luxury',
    image: '/images/model-dummy.jpg',
    fabricQuery: 'Linen',
  },
  {
    id: 'cat-tussar',
    name: 'Tussar Silk',
    count: '19 Styles',
    subtitle: 'Textured Wild Silk Coordinates with Kantha Stitching',
    image: '/images/model-dummy.jpg',
    fabricQuery: 'Tussar',
  },
];

export const FeaturedCategories: React.FC = () => {
  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-[0.72rem] tracking-[0.3em] uppercase text-[#C5A059] font-medium block mb-2">
            Explore Weaves
          </span>
          <h2 className="font-serif-editorial text-3xl md:text-4xl text-[#7A1C30] font-normal tracking-wide">
            Featured Fabric Categories
          </h2>
        </div>
        <Link
          href="/dress-materials"
          className="text-xs uppercase tracking-widest text-[#7A1C30] font-semibold hover:underline flex items-center gap-1"
        >
          View All Dress Materials →
        </Link>
      </div>

      {/* Grid of Visual Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {FABRIC_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/dress-materials?fabric=${encodeURIComponent(cat.fabricQuery)}`}
            className="group relative overflow-hidden rounded-2xl bg-[#F3EFEA] border border-[#EAE5D9] transition-all duration-500 hover:shadow-xl block aspect-[4/5]"
          >
            {/* Image */}
            <img
              src={getImageUrl(cat.image)}
              alt={cat.name}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

            {/* Top Count Badge */}
            <div className="absolute top-5 left-5 z-10">
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[0.65rem] tracking-widest uppercase font-semibold text-[#7A1C30] border border-[#C5A059]/30">
                {cat.count}
              </span>
            </div>

            {/* Bottom Meta */}
            <div className="absolute bottom-6 left-6 right-6 z-10 text-white flex items-end justify-between">
              <div>
                <h3 className="font-serif-editorial text-2xl font-medium tracking-wide mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs font-light text-[#FAF6EE]/80 font-sans line-clamp-2">
                  {cat.subtitle}
                </p>
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
