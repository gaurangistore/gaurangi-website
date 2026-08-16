'use client';

import React from 'react';
import { useContent } from '@/context/ContentContext';

export const WhyGaurangi: React.FC = () => {
  const { data } = useContent();
  const pillars = data.whyGaurangiPillars || [];

  if (data.hiddenSections?.whyGaurangi || pillars.length === 0) return null;

  const header = data.sectionHeaders || {};

  return (
    <section className="py-8 md:py-10">
      <div className="wrap">
        <div className="trust bg-paper">
          <div className="section-head px-6 pt-10 md:px-10 pb-0">
            <div>
              {header.whyGaurangiBadge && (
                <span className="mono text-rose mb-2.5 block">{header.whyGaurangiBadge}</span>
              )}
              <h2 className="font-display italic text-[clamp(26px,3.2vw,38px)]">
                {header.whyGaurangiTitle || 'Why It Feels Different in the Hand'}
              </h2>
            </div>
          </div>

          <div className="trust-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.id}
                className="trust-item p-8 lg:p-9 border-b lg:border-b-0 border-r-0 lg:border-r border-border-hair"
              >
                <span className="mono text-rose mb-2.5 block">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-base font-sans font-semibold mb-2">{pillar.title}</h3>
                <p className="text-[12.5px] text-ink-soft">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
