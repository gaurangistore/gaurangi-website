import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Heart, Eye, ShoppingBag } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DEFAULT_HOMEPAGE_DATA } from '@/context/ContentContext';
import { getImageUrl } from '@/lib/constants';

// Required for Next.js static export on GitHub Pages
export function generateStaticParams() {
  const collectionIds = ['col-1', 'col-2', 'col-3', 'col-4', 'wedding', 'festive', 'daily', 'formals', 'dress-materials', 'heritage-sarees'];
  return collectionIds.map((id) => ({ id }));
}

export default async function CollectionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const collectionsList = DEFAULT_HOMEPAGE_DATA?.collections || [];
  const collection = collectionsList.find((c) => c.id === id) || collectionsList[0] || {
    id: 'col-1',
    title: 'Wedding Collection',
    subtitle: 'Woven for grand celebrations and sacred vows.',
    image: '/images/model-dummy.jpg',
    tag: 'Haute Couture',
  };
  const products = DEFAULT_HOMEPAGE_DATA?.products || [];

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1F1F1F] flex flex-col font-sans">
      <Navbar />

      {/* Hero Narrative Header */}
      <section className="relative py-20 px-6 md:px-12 bg-[#F3EFEA] border-b border-[#EAE5D9]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#7A1C30] hover:underline mb-2 font-medium"
            >
              <ArrowLeft size={14} /> Back to All Collections
            </Link>

            {collection.tag && (
              <span className="px-3.5 py-1 rounded-full bg-white/80 text-[0.68rem] tracking-widest uppercase font-semibold text-[#7A1C30] border border-[#C5A059]/30 block w-fit">
                {collection.tag}
              </span>
            )}

            <h1 className="font-serif-editorial text-4xl md:text-5xl text-[#7A1C30] font-light tracking-wide">
              {collection.title}
            </h1>

            {collection.subtitle && (
              <p className="text-base font-light text-[#1F1F1F]/80 leading-relaxed font-sans">
                {collection.subtitle}
              </p>
            )}
          </div>

          {/* Collection Hero Image Display */}
          <div className="w-full md:w-[360px] aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border border-[#EAE5D9]">
            <img
              src={getImageUrl(collection.image)}
              alt={collection.title}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* Product Grid inside this Collection Room */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto w-full flex-1">
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="text-[0.72rem] tracking-[0.3em] uppercase text-[#C5A059] font-semibold block mb-1">
              Curated Selection
            </span>
            <h2 className="font-serif-editorial text-3xl text-[#7A1C30] font-normal">
              Outfits in {collection.title}
            </h2>
          </div>
          <span className="text-xs text-gray-500 font-light uppercase tracking-widest">
            {products.length} Designs Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className="group bg-[#FAF6EE] rounded-xl overflow-hidden border border-[#EAE5D9] transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
            >
              {/* Product Photography */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                <img
                  src={getImageUrl(item.image)}
                  alt={item.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Subtle Hover Action Pills */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-[#1F1F1F] hover:bg-[#7A1C30] hover:text-white flex items-center justify-center shadow-md transition-colors"
                    title="Wishlist"
                  >
                    <Heart size={16} />
                  </button>
                  <button
                    className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-[#1F1F1F] hover:bg-[#7A1C30] hover:text-white flex items-center justify-center shadow-md transition-colors"
                    title="Quick View"
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>

              {/* Minimal Product Meta */}
              <div className="p-5 flex flex-col gap-1.5 flex-1 justify-between">
                <div>
                  {item.category && (
                    <span className="text-[0.68rem] tracking-widest uppercase text-[#C5A059] font-medium block mb-1">
                      {item.category}
                    </span>
                  )}
                  {item.name && (
                    <h3 className="font-serif-editorial text-lg text-[#1F1F1F] font-medium leading-snug">
                      {item.name}
                    </h3>
                  )}
                  {item.fabric && (
                    <p className="text-xs text-gray-500 font-light mt-1">{item.fabric}</p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-[#EAE5D9] flex items-center justify-between">
                  {item.price && (
                    <span className="font-serif-editorial text-base font-semibold text-[#7A1C30]">
                      {item.price}
                    </span>
                  )}
                  <button className="text-xs tracking-wider uppercase font-medium text-[#7A1C30] hover:underline flex items-center gap-1">
                    <ShoppingBag size={13} /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
