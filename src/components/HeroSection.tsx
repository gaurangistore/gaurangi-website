'use client';

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-[92vh] min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Background Photography (Editorial Style) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2000&auto=format&fit=crop')",
        }}
      >
        {/* Soft Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
      </div>

      {/* Hero Cover Magazine Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white flex flex-col items-center">
        {/* Subtitle Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-[0.72rem] tracking-[0.3em] uppercase font-sans text-[#FAF6EE]">
            Editorial Selection • 2026
          </span>
        </div>

        {/* Main Headline */}
        <h2 className="font-serif-editorial text-4xl md:text-6xl lg:text-7xl font-light tracking-wide leading-tight mb-6">
          Autumn Heritage
        </h2>

        {/* Storytelling Tagline */}
        <p className="text-base md:text-xl font-light text-[#FAF6EE]/90 max-w-xl mb-10 tracking-wide font-sans leading-relaxed">
          Crafted for celebrations. Designed for timeless elegance.
        </p>

        {/* Single Primary Action Button */}
        <a href="#collections" className="btn-maroon group">
          <span>Explore Collection</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-80">
        <span className="text-[0.65rem] tracking-[0.25em] text-white/70 uppercase">Discover</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
};
