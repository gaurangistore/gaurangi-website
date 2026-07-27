'use client';

import React from 'react';
import { Camera } from 'lucide-react';
import { DUMMY_IMAGE } from '@/lib/constants';

const INSTA_IMAGES = [
  {
    url: DUMMY_IMAGE,
    tag: '#GaurangiWomen',
  },
  {
    url: DUMMY_IMAGE,
    tag: '#HandloomSilk',
  },
  {
    url: DUMMY_IMAGE,
    tag: '#FestiveGaurangi',
  },
  {
    url: DUMMY_IMAGE,
    tag: '#SilkSareeStory',
  },
];

export const InstagramGallery: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-center">
      {/* Header */}
      <div className="max-w-md mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-[#C5A059] mb-2">
          <Camera size={18} />
          <span className="text-[0.72rem] tracking-[0.3em] uppercase font-medium">
            @GaurangiFashions
          </span>
        </div>
        <h3 className="font-serif-editorial text-3xl md:text-4xl text-[#7A1C30] font-normal tracking-wide">
          Boutique Moments
        </h3>
      </div>

      {/* Masonry / Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {INSTA_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer border border-[#EAE5D9]"
          >
            <img
              src={img.url}
              alt={`Instagram Gallery ${idx}`}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
              <span className="text-xs font-medium tracking-widest uppercase bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30">
                {img.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
