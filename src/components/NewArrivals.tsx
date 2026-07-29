'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, Eye, ShoppingBag } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { getImageUrl } from '@/lib/constants';

export const NewArrivals: React.FC = () => {
  const { data } = useContent();
  const products = data.products && data.products.length > 0 ? data.products : [];
  const scrollRef = useRef<HTMLDivElement>(null);

  if (products.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="new-arrivals" className="py-24 bg-[#F3EFEA] border-y border-[#EAE5D9]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-[0.72rem] tracking-[0.3em] uppercase text-[#C5A059] font-medium block mb-2">
              Curated for This Season
            </span>
            <h3 className="font-serif-editorial text-3xl md:text-4xl text-[#7A1C30] font-normal tracking-wide">
              New Arrivals
            </h3>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-[#C5A059] flex items-center justify-center text-[#1F1F1F] hover:bg-[#7A1C30] hover:text-white hover:border-[#7A1C30] transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-[#C5A059] flex items-center justify-center text-[#1F1F1F] hover:bg-[#7A1C30] hover:text-white hover:border-[#7A1C30] transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4"
        >
          {products.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[280px] md:w-[320px] group bg-[#FAF6EE] rounded-xl overflow-hidden border border-[#EAE5D9] transition-all duration-300 hover:shadow-lg"
            >
              {/* Product Photography */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                <img
                  src={getImageUrl(item.image)}
                  alt={item.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Subtle Hover Action Pill */}
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
              <div className="p-5 flex flex-col gap-1.5">
                {item.category && (
                  <span className="text-[0.68rem] tracking-widest uppercase text-[#C5A059] font-medium">
                    {item.category}
                  </span>
                )}
                {item.name && (
                  <h4 className="font-serif-editorial text-lg text-[#1F1F1F] font-medium leading-snug line-clamp-1">
                    {item.name}
                  </h4>
                )}
                {item.fabric && (
                  <p className="text-xs text-gray-500 font-light">{item.fabric}</p>
                )}
                <div className="mt-3 pt-3 border-t border-[#EAE5D9] flex items-center justify-between">
                  {item.price ? (
                    <span className="font-serif-editorial text-base font-semibold text-[#7A1C30]">
                      {item.price}
                    </span>
                  ) : <div />}
                  <button className="text-xs tracking-wider uppercase font-medium text-[#7A1C30] hover:underline flex items-center gap-1">
                    <ShoppingBag size={13} /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
