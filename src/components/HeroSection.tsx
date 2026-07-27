'use client';

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { DUMMY_IMAGE } from '@/lib/constants';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#141213] text-[#FAF6EE] overflow-hidden -mt-20 pt-24 pb-12 flex items-center border-b border-[#C5A059]/20">
      
      {/* Background Soft Glow Accents */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-[#7A1C30]/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#C5A059]/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 my-auto">
        
        {/* Left Column: Storytelling & Typography */}
        <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6 pt-6">
          
          {/* Editorial Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C5A059]/40 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[0.72rem] tracking-[0.3em] uppercase font-sans text-[#FAF6EE]">
              Boutique Editorial • 2026
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif-editorial text-4xl md:text-6xl lg:text-7xl font-light tracking-wide leading-[1.1] text-white">
            Autumn <br />
            <span className="italic font-normal text-[#C5A059]">Heritage</span>
          </h1>

          {/* Tagline */}
          <p className="text-base md:text-lg font-light text-[#FAF6EE]/85 max-w-lg font-sans leading-relaxed">
            Crafted for celebrations. Designed for timeless elegance. Discover handloom silk weaves and intricate bridal embroidery.
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-3 gap-4 py-4 border-y border-[#C5A059]/20 w-full max-w-lg">
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

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a href="#collections" className="btn-maroon group shadow-xl">
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#occasions" className="px-6 py-3 rounded-full text-xs uppercase tracking-widest font-medium border border-[#C5A059]/40 text-[#FAF6EE] hover:bg-[#FAF6EE]/10 transition-all">
              View Occasions
            </a>
          </div>
        </div>

        {/* Right Column: Full Uncropped Portrait Model Photo */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end items-center">
          <div className="relative w-full max-w-[480px] h-[72vh] max-h-[660px] min-h-[480px] rounded-2xl overflow-hidden border border-[#C5A059]/40 shadow-2xl shadow-black/80 bg-[#1A1718] flex items-center justify-center p-2 group">
            
            {/* Full Model Photo displaying 100% without any cropping */}
            <img
              src={DUMMY_IMAGE}
              alt="Gaurangi Fashions Saree Model"
              className="w-full h-full object-contain object-center rounded-xl transition-transform duration-700 ease-out group-hover:scale-102"
            />

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between p-3.5 rounded-xl bg-[#141213]/85 backdrop-blur-md border border-[#C5A059]/30">
              <div>
                <span className="text-[0.62rem] tracking-widest uppercase text-[#C5A059] block">Featured Drape</span>
                <span className="font-serif-editorial text-sm md:text-base text-white font-medium">Rose Gold Banarasi Saree</span>
              </div>
              <span className="text-[0.7rem] px-3 py-1 rounded-full bg-[#7A1C30] text-white font-medium tracking-wide">
                Bestseller
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
