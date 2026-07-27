'use client';

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { DUMMY_IMAGE } from '@/lib/constants';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#121011] text-[#FAF6EE] overflow-hidden py-12 md:py-20 border-b border-[#C5A059]/20">
      {/* Background Soft Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7A1C30]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C5A059]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Luxury Editorial Typography & Storytelling */}
        <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
          
          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF6EE]/10 backdrop-blur-md border border-[#C5A059]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[0.72rem] tracking-[0.3em] uppercase font-sans text-[#FAF6EE]/90">
              Boutique Editorial • 2026
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif-editorial text-4xl md:text-6xl lg:text-7xl font-light tracking-wide leading-[1.1] text-white">
            Autumn <br />
            <span className="italic font-normal text-[#C5A059]">Heritage</span>
          </h1>

          {/* Storytelling Tagline */}
          <p className="text-base md:text-lg font-light text-[#FAF6EE]/80 max-w-lg font-sans leading-relaxed">
            Crafted for celebrations. Designed for timeless elegance. Every thread tells a story of royal weaves and artisanal craftsmanship.
          </p>

          {/* Key Product Attributes */}
          <div className="grid grid-cols-3 gap-4 pt-2 pb-4 border-y border-[#C5A059]/20 w-full max-w-lg">
            <div>
              <span className="block text-[0.65rem] uppercase tracking-widest text-[#C5A059]">Weave</span>
              <span className="font-serif-editorial text-sm md:text-base text-white">Banarasi Silk</span>
            </div>
            <div>
              <span className="block text-[0.65rem] uppercase tracking-widest text-[#C5A059]">Craft</span>
              <span className="font-serif-editorial text-sm md:text-base text-white">Zari Work</span>
            </div>
            <div>
              <span className="block text-[0.65rem] uppercase tracking-widest text-[#C5A059]">Occasion</span>
              <span className="font-serif-editorial text-sm md:text-base text-white">Festive Edit</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a href="#collections" className="btn-maroon group">
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#occasions" className="px-6 py-3 rounded-full text-xs uppercase tracking-widest font-medium border border-[#C5A059]/40 text-[#FAF6EE] hover:bg-[#FAF6EE]/10 transition-all">
              View Occasions
            </a>
          </div>
        </div>

        {/* Right Column: Complete Model Portrait Frame (Face & Saree) */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[460px] aspect-[3/4] rounded-2xl overflow-hidden border border-[#C5A059]/40 shadow-2xl shadow-black/80 group">
            {/* Model Image with object-top and smooth scale */}
            <img
              src={DUMMY_IMAGE}
              alt="Gaurangi Fashions Saree Model"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Subtle Gradient Framing */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between p-4 rounded-xl bg-[#121011]/80 backdrop-blur-md border border-[#C5A059]/30">
              <div>
                <span className="text-[0.65rem] tracking-widest uppercase text-[#C5A059] block">Featured Drape</span>
                <span className="font-serif-editorial text-base text-white font-medium">Rose Gold Banarasi Silk</span>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-[#7A1C30] text-white font-medium tracking-wide">
                New Arrival
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
