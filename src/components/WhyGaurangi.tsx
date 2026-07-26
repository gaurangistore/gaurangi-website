'use client';

import React from 'react';
import { Feather, Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';

interface Pillar {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const PILLARS: Pillar[] = [
  {
    icon: <Feather className="w-6 h-6 text-[#C5A059]" />,
    title: 'Designed with Passion',
    description: 'Every silhouette is born from deep appreciation for heritage aesthetics and modern comfort.',
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-[#C5A059]" />,
    title: 'Curated by Artisans',
    description: 'Direct collaboration with master weavers and embroiderers preserving centuries-old craft.',
  },
  {
    icon: <Sparkles className="w-6 h-6 text-[#C5A059]" />,
    title: 'Premium Natural Fabrics',
    description: 'Pure silks, breathable linens, and organic cottons woven to drape like liquid luxury.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#C5A059]" />,
    title: 'Trusted Quality',
    description: 'Rigorous hand-inspection for weave perfection, seam integrity, and authentic artistry.',
  },
];

export const WhyGaurangi: React.FC = () => {
  return (
    <section id="stories" className="py-28 px-6 md:px-12 max-w-7xl mx-auto text-center">
      {/* Brand Ethos Headline */}
      <div className="max-w-3xl mx-auto mb-20">
        <span className="text-[0.72rem] tracking-[0.35em] uppercase text-[#C5A059] font-medium block mb-4">
          The Gaurangi Ethos
        </span>
        <h3 className="font-serif-editorial text-3xl md:text-5xl text-[#7A1C30] font-normal leading-tight tracking-wide mb-6">
          "Where every collection tells a story of heritage & timeless grace."
        </h3>
        <p className="text-sm md:text-base font-light text-[#1F1F1F]/70 max-w-2xl mx-auto font-sans leading-relaxed">
          We believe fashion should feel calm, authentic, and deeply personal. Instead of mass-produced catalogs, we present handpicked edits designed to celebrate your unique story.
        </p>
        <div className="w-16 h-[1px] bg-[#C5A059] mx-auto mt-8" />
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {PILLARS.map((pillar, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center p-8 rounded-2xl bg-[#FAF6EE] border border-[#EAE5D9] transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="w-14 h-14 rounded-full bg-[#F3EFEA] border border-[#C5A059]/40 flex items-center justify-center mb-6">
              {pillar.icon}
            </div>
            <h4 className="font-serif-editorial text-xl text-[#7A1C30] font-medium mb-3">
              {pillar.title}
            </h4>
            <p className="text-xs text-gray-600 font-light leading-relaxed">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
