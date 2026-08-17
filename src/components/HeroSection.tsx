'use client';

import React from 'react';
import Link from 'next/link';
import { useContent } from '@/context/ContentContext';
import { getImageUrl } from '@/lib/constants';

export const HeroSection: React.FC = () => {
  const { data, isLoading } = useContent();
  const slides = data.heroSlides && data.heroSlides.length > 0 ? data.heroSlides : [];
  const active = slides[0];

  if (data.hiddenSections?.heroBanner || !active) return null;

  return (
    <section className="hero py-12 md:py-16">
      <div className="wrap grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* Left Column: Editorial Typography & Storytelling */}
        <div className="flex flex-col items-start text-left">
          {active.badge && (
            <div className="eyebrow mb-4">
              <span className="mono">{active.badge}</span>
            </div>
          )}

          {(active.title || active.italicTitle) && (
            <h1 className="font-display italic text-[clamp(42px,6.4vw,78px)] leading-[1.02] text-ink">
              {active.title}{' '}
              {active.italicTitle && <em className="not-italic text-rose">{active.italicTitle}</em>}
            </h1>
          )}

          {active.tagline && (
            <p className="lede max-w-[440px] mt-5 text-[17px] text-ink-soft">{active.tagline}</p>
          )}

          <div className="tag-row flex flex-wrap gap-2.5 mt-6">
            {active.weave && <span className="tag">{active.weave}</span>}
            {active.craft && <span className="tag">{active.craft}</span>}
            {active.occasion && <span className="tag">{active.occasion}</span>}
          </div>

          <div className="cta-row mt-8 flex flex-wrap items-center gap-4">
            <Link href="/shop" className="btn-primary">
              Shop the Edit
            </Link>
            <Link href="/craft" className="link-under">
              See how it&rsquo;s made ↓
            </Link>
          </div>
        </div>

        {/* Right Column: Motif Stage */}
        <div className="motif-stage stitch aspect-square bg-paper flex items-center justify-center relative overflow-hidden">
          {!isLoading && active.image && (
            <img
              src={getImageUrl(active.image)}
              alt={active.title || 'Gaurangi'}
              className="w-full h-full object-cover object-top"
            />
          )}
          <div className="motif-caption mono absolute bottom-4 left-4 right-4 flex justify-between text-[10.5px] text-ink-soft">
            <span>From Our Workshop</span>
            <span>Actual Piece</span>
          </div>
        </div>
      </div>
    </section>
  );
};
