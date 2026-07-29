import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Heart, Eye, ShoppingBag, CheckCircle, Quote } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DEFAULT_HOMEPAGE_DATA } from '@/context/ContentContext';
import { getImageUrl } from '@/lib/constants';

// Required for Next.js static export on GitHub Pages
export function generateStaticParams() {
  return [
    { id: 'occ-1' },
    { id: 'occ-2' },
    { id: 'occ-3' },
    { id: 'occ-4' },
    { id: 'occ-5' },
    { id: 'wedding' },
    { id: 'festive' },
    { id: 'executive' },
  ];
}

export default async function OccasionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const occasionsList = DEFAULT_HOMEPAGE_DATA?.occasions || [];
  const occasion = occasionsList.find((o) => o.id === id) || occasionsList[0] || {
    id: 'occ-1',
    title: 'Wedding Celebrations',
    subtitle: 'Royal weaves & embroidered grandeur',
    image: '/images/model-dummy.jpg',
    gridSpan: 'md:col-span-2 md:row-span-2',
  };
  const products = DEFAULT_HOMEPAGE_DATA?.products || [];
  const collections = DEFAULT_HOMEPAGE_DATA?.collections || [];

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1F1F1F] flex flex-col font-sans">
      <Navbar />

      {/* Layer 1: Event Hero Banner */}
      <section className="relative py-20 px-6 md:px-12 bg-[#F3EFEA] border-b border-[#EAE5D9]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <Link
              href="/occasions"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#7A1C30] hover:underline mb-2 font-medium"
            >
              <ArrowLeft size={14} /> Back to All Event Mindsets
            </Link>

            <span className="px-3.5 py-1 rounded-full bg-white/80 text-[0.68rem] tracking-widest uppercase font-semibold text-[#7A1C30] border border-[#C5A059]/30 block w-fit">
              Occasion Guide
            </span>

            <h1 className="font-serif-editorial text-4xl md:text-5xl text-[#7A1C30] font-light tracking-wide">
              {occasion.title}
            </h1>

            {occasion.subtitle && (
              <p className="text-base font-light text-[#1F1F1F]/80 leading-relaxed font-sans">
                {occasion.subtitle}
              </p>
            )}

            <div className="pt-4 flex flex-wrap gap-4 text-xs text-[#7A1C30] font-medium">
              <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full border border-[#EAE5D9]">
                <CheckCircle size={13} className="text-[#C5A059]" /> Recommended Fabric: Mulberry Silk & Organza
              </span>
              <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full border border-[#EAE5D9]">
                <CheckCircle size={13} className="text-[#C5A059]" /> Drape Style: Royal Pleated
              </span>
            </div>
          </div>

          {/* Occasion Image */}
          <div className="w-full md:w-[360px] aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border border-[#EAE5D9]">
            <img
              src={getImageUrl(occasion.image)}
              alt={occasion.title}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* Layer 2: Recommended Collections for this Occasion */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto w-full border-b border-[#EAE5D9]">
        <div className="mb-8">
          <span className="text-[0.72rem] tracking-[0.3em] uppercase text-[#C5A059] font-semibold block mb-1">
            Curated Pairing
          </span>
          <h2 className="font-serif-editorial text-2xl md:text-3xl text-[#7A1C30] font-normal">
            Recommended Collections for {occasion.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.slice(0, 4).map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.id}`}
              className="group p-4 bg-white rounded-xl border border-[#EAE5D9] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[0.65rem] uppercase tracking-widest text-[#C5A059] font-semibold block mb-1">
                  {col.tag || 'Collection'}
                </span>
                <h3 className="font-serif-editorial text-lg text-[#7A1C30] font-medium mb-1">
                  {col.title}
                </h3>
                <p className="text-xs text-gray-500 font-light line-clamp-2">{col.subtitle}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#EAE5D9] flex items-center justify-between text-xs text-[#7A1C30] font-medium group-hover:underline">
                <span>View Collection</span>
                <ArrowLeft size={12} className="rotate-180" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Layer 3: Curated Product Outfits Grid */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto w-full flex-1">
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="text-[0.72rem] tracking-[0.3em] uppercase text-[#C5A059] font-semibold block mb-1">
              Curated Outfits
            </span>
            <h2 className="font-serif-editorial text-3xl text-[#7A1C30] font-normal">
              Outfits Perfect for {occasion.title}
            </h2>
          </div>
          <span className="text-xs text-gray-500 font-light uppercase tracking-widest">
            {products.length} Styles
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className="group bg-[#FAF6EE] rounded-xl overflow-hidden border border-[#EAE5D9] transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
            >
              {/* Product Photo */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                <img
                  src={getImageUrl(item.image)}
                  alt={item.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                />

                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-9 h-9 rounded-full bg-white/90 text-[#1F1F1F] hover:bg-[#7A1C30] hover:text-white flex items-center justify-center shadow-md">
                    <Heart size={16} />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-white/90 text-[#1F1F1F] hover:bg-[#7A1C30] hover:text-white flex items-center justify-center shadow-md">
                    <Eye size={16} />
                  </button>
                </div>
              </div>

              {/* Product Meta */}
              <div className="p-5 flex flex-col gap-1.5 flex-1 justify-between">
                <div>
                  <span className="text-[0.68rem] tracking-widest uppercase text-[#C5A059] font-medium block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif-editorial text-lg text-[#1F1F1F] font-medium leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-light mt-1">{item.fabric}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EAE5D9] flex items-center justify-between">
                  <span className="font-serif-editorial text-base font-semibold text-[#7A1C30]">
                    {item.price}
                  </span>
                  <button className="text-xs tracking-wider uppercase font-medium text-[#7A1C30] hover:underline flex items-center gap-1">
                    <ShoppingBag size={13} /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Layer 4: Styling Quote & Client Story */}
      <section className="py-16 bg-[#F3EFEA] border-t border-[#EAE5D9] px-6 md:px-12 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <Quote className="w-8 h-8 text-[#C5A059] mx-auto opacity-70" />
          <blockquote className="font-serif-editorial text-2xl text-[#7A1C30] italic font-normal">
            "For {occasion.title}, opt for lightweight drape silk that carries rich embroidery while remaining weightless during long celebrations."
          </blockquote>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A059] block">
            Gaurangi Master Stylist Note
          </span>
        </div>
      </section>

      <Footer />
    </div>
  );
}
