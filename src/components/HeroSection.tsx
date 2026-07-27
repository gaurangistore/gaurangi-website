'use client';

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { DUMMY_IMAGE } from '@/lib/constants';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden -mt-20 pt-20">
      {/* 1. Full-Bleed Background Layer extending under Navbar */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('${DUMMY_IMAGE}')`,
          backgroundPosition: 'center 4%',
        }}
      >
        {/* Soft Vignette Overlay for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0E] via-[#0C0C0E]/40 to-[#0C0C0E]/50" />
        <div className="absolute inset-0 bg-radial-vignette opacity-60" />
      </div>

      {/* 2. Hero Magazine Cover Overlay Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white flex flex-col items-center mt-10">
        {/* Subtitle Badge */}
        <div className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 shadow-lg animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-[0.72rem] tracking-[0.3em] uppercase font-sans text-[#FAF6EE]">
            Editorial Selection • 2026
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif-editorial text-4xl md:text-6xl lg:text-7xl font-light tracking-wide leading-tight mb-6 drop-shadow-md">
          Autumn Heritage
        </h1>

        {/* Storytelling Tagline */}
        <p className="text-base md:text-xl font-light text-[#FAF6EE]/90 max-w-xl mb-10 tracking-wide font-sans leading-relaxed drop-shadow">
          Crafted for celebrations. Designed for timeless elegance.
        </p>

        {/* Primary Action Button */}
        <a href="#collections" className="btn-maroon group shadow-2xl">
          <span>Explore Collection</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>

      {/* 3. Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-80">
        <span className="text-[0.65rem] tracking-[0.25em] text-white/80 uppercase">Discover</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
};
