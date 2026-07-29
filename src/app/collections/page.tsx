'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, Clock } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useContent } from '@/context/ContentContext';
import { getImageUrl } from '@/lib/constants';

interface CollectionRoom {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  itemCount: string;
  isComingSoon?: boolean;
}

const FUTURE_COLLECTIONS: CollectionRoom[] = [
  {
    id: 'col-men',
    slug: 'men',
    title: 'Men’s Wear',
    subtitle: 'Bespoke Kurtas, Bandhgalas & Heritage Linen Shirts.',
    tag: 'Coming Soon • 2026',
    image: '/images/model-dummy.jpg',
    itemCount: 'In Craftsmanship',
    isComingSoon: true,
  },
  {
    id: 'col-kids',
    slug: 'kids',
    title: 'Kids Collection',
    subtitle: 'Gentle organic silks & festive outfits for little ones.',
    tag: 'Coming Soon • 2026',
    image: '/images/model-dummy.jpg',
    itemCount: 'In Weaving',
    isComingSoon: true,
  },
  {
    id: 'col-acc',
    slug: 'accessories',
    title: 'Artisan Accessories',
    subtitle: 'Gold vermeil jewelry, embroidered footwear & silk drapes.',
    tag: 'Coming Soon • 2026',
    image: '/images/model-dummy.jpg',
    itemCount: 'In Curation',
    isComingSoon: true,
  },
  {
    id: 'col-home',
    slug: 'home-decor',
    title: 'Home & Heritage Linen',
    subtitle: 'Hand-block cushion covers, silk throws & table linens.',
    tag: 'Coming Soon • 2026',
    image: '/images/model-dummy.jpg',
    itemCount: 'In Weaving',
    isComingSoon: true,
  },
];

export default function CollectionsLandingPage() {
  const { data } = useContent();
  const activeCollections = data.collections || [];

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1F1F1F] flex flex-col font-sans">
      <Navbar />

      {/* Hero Header */}
      <section className="py-20 px-6 md:px-12 bg-[#F3EFEA] border-b border-[#EAE5D9] text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#C5A059]/40 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[0.72rem] tracking-[0.3em] uppercase text-[#7A1C30] font-medium">
              Fashion-First Journey
            </span>
          </div>
          <h1 className="font-serif-editorial text-4xl md:text-6xl text-[#7A1C30] font-light tracking-wide">
            Curated Collections
          </h1>
          <p className="text-sm md:text-base font-light text-[#1F1F1F]/80 font-sans leading-relaxed">
            Step into our boutique rooms. Every collection represents a distinct textile tradition, handloom weave, and silhouette edit.
          </p>
        </div>
      </section>

      {/* Main Active Collections Grid */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <span className="text-[0.72rem] tracking-[0.3em] uppercase text-[#C5A059] font-semibold block mb-1">
            Boutique Rooms
          </span>
          <h2 className="font-serif-editorial text-3xl md:text-4xl text-[#7A1C30] font-normal">
            Explore Current Edits
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {activeCollections.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.id}`}
              className="group relative overflow-hidden rounded-2xl bg-[#F3EFEA] border border-[#EAE5D9] transition-all duration-500 hover:shadow-2xl cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src={getImageUrl(col.image)}
                  alt={col.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top Tag */}
                {col.tag && (
                  <div className="absolute top-6 left-6 z-10">
                    <span className="px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[0.68rem] tracking-widest uppercase font-semibold text-[#7A1C30] border border-[#C5A059]/30">
                      {col.tag}
                    </span>
                  </div>
                )}

                {/* Bottom Editorial Text */}
                <div className="absolute bottom-8 left-6 right-6 z-10 text-white flex items-end justify-between">
                  <div>
                    <h3 className="font-serif-editorial text-2xl md:text-3xl font-medium tracking-wide mb-1">
                      {col.title}
                    </h3>
                    {col.subtitle && (
                      <p className="text-xs md:text-sm font-light text-[#FAF6EE]/80 max-w-sm">
                        {col.subtitle}
                      </p>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#7A1C30] group-hover:border-[#7A1C30]">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Future Expansion Collections (Coming Soon) */}
      <section className="py-20 px-6 md:px-12 bg-[#F3EFEA] border-t border-[#EAE5D9] w-full">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-[0.72rem] tracking-[0.3em] uppercase text-[#C5A059] font-semibold block mb-1">
              Future Expansion
            </span>
            <h2 className="font-serif-editorial text-3xl md:text-4xl text-[#7A1C30] font-normal">
              Upcoming Boutique Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FUTURE_COLLECTIONS.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-xl overflow-hidden bg-white border border-[#EAE5D9] p-6 flex flex-col justify-between shadow-sm opacity-85 hover:opacity-100 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#FAF6EE] text-[0.62rem] tracking-widest uppercase font-semibold text-[#7A1C30] border border-[#C5A059]/30 flex items-center gap-1">
                      <Clock size={11} /> {item.tag}
                    </span>
                  </div>
                  <h3 className="font-serif-editorial text-xl text-[#7A1C30] font-medium mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#EAE5D9] flex items-center justify-between text-xs text-[#C5A059] font-medium">
                  <span>{item.itemCount}</span>
                  <span className="uppercase tracking-widest text-[0.65rem] text-gray-400">Preview</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
