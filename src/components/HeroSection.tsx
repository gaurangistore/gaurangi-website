'use client';

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { DUMMY_IMAGE } from '@/lib/constants';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#FAF6EE] text-[#1F1F1F] overflow-hidden -mt-20 pt-28 pb-16 border-b border-[#EAE5D9]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Editorial Typography & Storytelling */}
        <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
          
          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3EFEA] border border-[#C5A059]/40 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[0.72rem] tracking-[0.3em] uppercase font-sans text-[#7A1C30] font-medium">
              Editorial Selection • 2026
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif-editorial text-4xl md:text-6xl lg:text-7xl font-light tracking-wide leading-[1.1] text-[#7A1C30]">
            Autumn <br />
            <span className="italic font-normal text-[#C5A059]">Heritage</span>
          </h1>

          {/* Storytelling Tagline */}
          <p className="text-base md:text-lg font-light text-[#1F1F1F]/80 max-w-lg font-sans leading-relaxed">
            Crafted for celebrations. Designed for timeless elegance. Discover handloom silk weaves, real zari embroidery, and bespoke luxury tailoring.
          </p>

          {/* Key Attributes */}
          <div className="grid grid-cols-3 gap-4 py-4 border-y border-[#C5A059]/30 w-full max-w-lg">
            <div>
              <span className="block text-[0.65rem] uppercase tracking-widest text-[#C5A059] font-medium">Weave</span>
              <span className="font-serif-editorial text-sm md:text-base text-[#7A1C30] font-medium">Banarasi Silk</span>
            </div>
            <div>
              <span className="block text-[0.65rem] uppercase tracking-widest text-[#C5A059] font-medium">Craft</span>
              <span className="font-serif-editorial text-sm md:text-base text-[#7A1C30] font-medium">Zari Work</span>
            </div>
            <div>
              <span className="block text-[0.65rem] uppercase tracking-widest text-[#C5A059] font-medium">Occasion</span>
              <span className="font-serif-editorial text-sm md:text-base text-[#7A1C30] font-medium">Festive Edit</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a href="#collections" className="btn-maroon group shadow-md">
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#occasions" className="px-6 py-3 rounded-full text-xs uppercase tracking-widest font-medium border border-[#7A1C30]/40 text-[#7A1C30] hover:bg-[#7A1C30] hover:text-white transition-all">
              View Occasions
            </a>
          </div>
        </div>

        {/* Right Column: Clean Frameless Model Photo (No Box Frame, Warm Matching Background) */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end items-center">
          <div className="relative w-full max-w-[460px] aspect-[3/4]">
            
            {/* Pure Model Photo without any box border or frame */}
            <img
              src={DUMMY_IMAGE}
              alt="Gaurangi Fashions Model"
              className="w-full h-full object-contain object-center rounded-2xl shadow-xl"
            />

          </div>
        </div>

      </div>
    </section>
  );
};
