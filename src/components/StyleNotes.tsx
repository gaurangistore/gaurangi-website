'use client';

import React from 'react';
import { useContent } from '@/context/ContentContext';

export const StyleNotes: React.FC = () => {
  const { data } = useContent();
  const stories = data.customerStories || [];

  if (data.hiddenSections?.customerStories || stories.length === 0) return null;

  const header = data.sectionHeaders || {};

  return (
    <section className="py-16 md:py-20">
      <div className="wrap">
        <div className="section-head mb-10 md:mb-11">
          {header.reviewsBadge && (
            <span className="mono text-rose mb-2.5 block">{header.reviewsBadge}</span>
          )}
          <h2 className="font-display italic text-[clamp(30px,3.6vw,44px)]">
            {header.reviewsTitle || 'Style notes'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stories.map((story) => (
            <div key={story.id} className="testi-card bg-paper p-7 flex flex-col gap-4">
              <p className="font-display italic text-[15px]">“{story.quote}”</p>
              <div className="testi-who flex items-center justify-between text-xs text-ink-soft">
                <strong className="text-ink font-semibold">{story.name}</strong>
                <span>{story.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
