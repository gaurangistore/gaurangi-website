'use client';

import React from 'react';
import { useContent } from '@/context/ContentContext';

export const ArtisansSection: React.FC = () => {
  const { data } = useContent();

  if (data.hiddenSections?.artisansSection) return null;

  const craft = data.craftPageContent;

  return (
    <section id="artisan" className="py-8 md:py-10">
      <div className="wrap grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-14 items-center">
        <div className="artisan-card bg-paper p-8 md:p-9 flex flex-col gap-4">
          <span className="mono text-emerald">Artisan Spotlight</span>
          <h3 className="font-display italic text-2xl">
            {craft?.workshopsTitle || 'The workshops of Pipili'}
          </h3>
          <p className="text-sm text-ink-soft">
            {craft?.workshopsBody ||
              'This town outside Bhubaneswar has practiced chandua appliqué for generations — first for temple canopies and ceremonial umbrellas, now cut into pieces you’d actually wear to work on a Tuesday.'}
          </p>
          <a href="/craft#artisans" className="link-under">
            {craft?.workshopsLinkText || 'Read the full story'} →
          </a>
        </div>

        <div>
          <span className="mono text-rose block mb-3.5">Why We Name the Workshop</span>
          <h2 className="font-display italic text-[clamp(26px,3.2vw,34px)] mb-4">
            {craft?.artisansTitle || 'A name behind every piece'}
          </h2>
          <p className="text-ink-soft text-[14.5px] max-w-[460px]">
            {craft?.artisansBody ||
              'Placeholder copy — once you tell us which workshop or artisan group supplies each collection, this space can credit them directly: their name, their town, a short note on their specialty. It’s the one thing a fast-fashion copy can’t fake.'}
          </p>
        </div>
      </div>
    </section>
  );
};
