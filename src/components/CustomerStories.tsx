'use client';

import React from 'react';
import { Quote } from 'lucide-react';

interface CustomerStory {
  id: string;
  name: string;
  location: string;
  quote: string;
  image: string;
  occasion: string;
}

const STORIES: CustomerStory[] = [
  {
    id: 's1',
    name: 'Ananya Sharma',
    location: 'New Delhi',
    quote:
      'The Chanderi silk weave felt completely weightless during my sister’s sangeet. The drape is so soft and regal.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    occasion: 'Sister’s Sangeet Ceremony',
  },
  {
    id: 's2',
    name: 'Rohan & Meera Merchant',
    location: 'Mumbai',
    quote:
      'We wanted matching heritage outfits that didn’t feel over-dramatic. Gaurangi delivered pure timeless luxury.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    occasion: 'Anniversary Celebration',
  },
  {
    id: 's3',
    name: 'Dr. Priya Varma',
    location: 'Bengaluru',
    quote:
      'Finding linen coordinates that look structured for medical conferences yet feel comfortable in heat is rare. Truly impressive.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    occasion: 'Executive Conference',
  },
];

export const CustomerStories: React.FC = () => {
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
          {STORIES.map((story) => (
            <div
              key={story.id}
              className="bg-[#FAF6EE] p-8 rounded-2xl border border-[#EAE5D9] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <Quote className="w-8 h-8 text-[#C5A059] opacity-60 mb-4" />
                <p className="font-serif-editorial text-lg text-[#1F1F1F] font-normal leading-relaxed italic mb-6">
                  "{story.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-[#EAE5D9]">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#C5A059]"
                />
                <div>
                  <h4 className="font-serif-editorial text-base text-[#7A1C30] font-medium">
                    {story.name}
                  </h4>
                  <span className="text-[0.72rem] text-gray-500 font-sans block">
                    {story.location} • {story.occasion}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
