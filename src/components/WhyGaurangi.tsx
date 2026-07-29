'use client';

import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake, Truck } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

interface Pillar {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const PILLARS: Pillar[] = [
  {
    icon: <Sparkles className="w-6 h-6 text-[#C5A059]" />,
    title: 'Premium Fabrics',
    description: '100% authentic handloom pure silks, organzas, Banarasis & breathable linens.',
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-[#C5A059]" />,
    title: 'Authentic Craftsmanship',
    description: 'Directly sourced from traditional master weavers and embroiderers across India.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#C5A059]" />,
    title: 'Quality Checked',
    description: 'Every set undergoes rigorous 3-step hand inspection before dispatch.',
  },
  {
    icon: <Truck className="w-6 h-6 text-[#C5A059]" />,
    title: 'Fast & Secure Delivery',
    description: 'Free express doorstep delivery with hassle-free 7-day easy returns.',
  },
];

export const WhyGaurangi: React.FC = () => {
  const { data } = useContent();

  if (data.hiddenSections?.whyGaurangi) return null;
  return (
    <section id="about" className="py-16 bg-[#F3EFEA] border-b border-[#EAE5D9]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        {/* Section Header */}
        <div className="max-w-xl mx-auto mb-12">
          <span className="text-[0.72rem] tracking-[0.3em] uppercase text-[#C5A059] font-medium block mb-2">
            Why Shop With Us
          </span>
          <h2 className="font-serif-editorial text-3xl md:text-4xl text-[#7A1C30] font-normal tracking-wide">
            The Gaurangi Guarantee
          </h2>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-4" />
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#FAF6EE] border border-[#EAE5D9] transition-transform duration-300 hover:-translate-y-1 hover:shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-[#F3EFEA] border border-[#C5A059]/40 flex items-center justify-center mb-4">
                {pillar.icon}
              </div>
              <h3 className="font-serif-editorial text-lg text-[#7A1C30] font-medium mb-2">
                {pillar.title}
              </h3>
              <p className="text-xs text-gray-600 font-light leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
