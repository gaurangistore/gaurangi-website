'use client';

import React from 'react';
import { Quote } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export const CustomerStories: React.FC = () => {
  const { data } = useContent();
  const stories = data.customerStories && data.customerStories.length > 0 ? data.customerStories : [];

  if (stories.length === 0) return null;

  return (
    <section className="py-24 bg-[#F3EFEA] border-y border-[#EAE5D9]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[0.72rem] tracking-[0.3em] uppercase text-[#C5A059] font-medium block mb-2">
            Real Experiences
          </span>
          <h3 className="font-serif-editorial text-3xl md:text-4xl text-[#7A1C30] font-normal tracking-wide">
            Customer Stories
          </h3>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-4" />
        </div>

        {/* Stories Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-[#FAF6EE] p-8 rounded-2xl border border-[#EAE5D9] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <Quote className="w-8 h-8 text-[#C5A059] opacity-60 mb-4" />
                {story.quote && (
                  <p className="font-serif-editorial text-lg text-[#1F1F1F] font-normal leading-relaxed italic mb-6">
                    "{story.quote}"
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-[#EAE5D9]">
                {story.image && (
                  <img
                    src={story.image}
                    alt={story.name || 'Client'}
                    className="w-12 h-12 rounded-full object-cover border border-[#C5A059]"
                  />
                )}
                <div>
                  {story.name && (
                    <h4 className="font-serif-editorial text-base text-[#7A1C30] font-medium">
                      {story.name}
                    </h4>
                  )}
                  {(story.location || story.occasion) && (
                    <span className="text-[0.72rem] text-gray-500 font-sans block">
                      {story.location} {story.location && story.occasion ? '• ' : ''}{story.occasion}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
