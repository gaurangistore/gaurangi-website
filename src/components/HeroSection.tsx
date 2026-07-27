'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export const HeroSection: React.FC = () => {
  const { data } = useContent();
  const slides = data.heroSlides && data.heroSlides.length > 0 ? data.heroSlides : [];
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play slider every 5 seconds
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const active = slides[currentSlide] || slides[0];
  const hasAttributes = Boolean(active.weave || active.craft || active.occasion);

  return (
    <section className="relative w-full bg-[#FAF6EE] text-[#1F1F1F] overflow-hidden py-12 md:py-16 border-b border-[#EAE5D9]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Editorial Typography & Storytelling */}
        <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6 transition-all duration-500">
          
          {/* Subtitle Badge */}
          {active.badge && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3EFEA] border border-[#C5A059]/40 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[0.72rem] tracking-[0.3em] uppercase font-sans text-[#7A1C30] font-medium">
                {active.badge}
              </span>
            </div>
          )}

          {/* Main Headline */}
          {(active.title || active.italicTitle) && (
            <h1 className="font-serif-editorial text-4xl md:text-6xl lg:text-7xl font-light tracking-wide leading-[1.1] text-[#7A1C30]">
              {active.title} {active.italicTitle && <br />}
              {active.italicTitle && <span className="italic font-normal text-[#C5A059]">{active.italicTitle}</span>}
            </h1>
          )}

          {/* Storytelling Tagline */}
          {active.tagline && (
            <p className="text-base md:text-lg font-light text-[#1F1F1F]/80 max-w-lg font-sans leading-relaxed">
              {active.tagline}
            </p>
          )}

          {/* Key Attributes */}
          {hasAttributes && (
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-[#C5A059]/30 w-full max-w-lg">
              {active.weave && (
                <div>
                  <span className="block text-[0.65rem] uppercase tracking-widest text-[#C5A059] font-medium">Weave</span>
                  <span className="font-serif-editorial text-sm md:text-base text-[#7A1C30] font-medium">{active.weave}</span>
                </div>
              )}
              {active.craft && (
                <div>
                  <span className="block text-[0.65rem] uppercase tracking-widest text-[#C5A059] font-medium">Craft</span>
                  <span className="font-serif-editorial text-sm md:text-base text-[#7A1C30] font-medium">{active.craft}</span>
                </div>
              )}
              {active.occasion && (
                <div>
                  <span className="block text-[0.65rem] uppercase tracking-widest text-[#C5A059] font-medium">Occasion</span>
                  <span className="font-serif-editorial text-sm md:text-base text-[#7A1C30] font-medium">{active.occasion}</span>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons & Slider Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 w-full max-w-lg">
            <div className="flex items-center gap-3">
              <a href="#collections" className="btn-maroon group shadow-md">
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#occasions" className="px-6 py-3 rounded-full text-xs uppercase tracking-widest font-medium border border-[#7A1C30]/40 text-[#7A1C30] hover:bg-[#7A1C30] hover:text-white transition-all">
                View Occasions
              </a>
            </div>

            {/* Slider Next/Prev Arrow Controls */}
            {slides.length > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full border border-[#C5A059] text-[#7A1C30] flex items-center justify-center hover:bg-[#7A1C30] hover:text-white transition-colors"
                  title="Previous Slide"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full border border-[#C5A059] text-[#7A1C30] flex items-center justify-center hover:bg-[#7A1C30] hover:text-white transition-colors"
                  title="Next Slide"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Slide Indicator Dots */}
          {slides.length > 1 && (
            <div className="flex items-center gap-3 pt-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-300 ${
                    currentSlide === index
                      ? 'w-8 h-2 bg-[#7A1C30] rounded-full'
                      : 'w-2 h-2 bg-[#C5A059]/40 hover:bg-[#C5A059] rounded-full'
                  }`}
                  title={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

        </div>

        {/* Right Column: Model Photo Slider Display */}
        {active.image && (
          <div className="lg:col-span-6 flex justify-center lg:justify-end items-center">
            <div className="relative w-full max-w-[460px] aspect-[3/4]">
              <img
                key={active.id}
                src={active.image}
                alt={active.title || 'Slide'}
                className="w-full h-full object-contain object-center rounded-2xl shadow-xl transition-all duration-500 animate-fade-in"
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
