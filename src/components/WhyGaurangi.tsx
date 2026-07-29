'use client';

import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake, Truck, Award } from 'lucide-react';
import { useContent, TrustPillarItem } from '@/context/ContentContext';

const DEFAULT_PILLARS: TrustPillarItem[] = [
  {
    id: 'p1',
    title: 'Premium Fabrics',
    description: '100% authentic handloom pure silks, organzas, Banarasis & breathable linens.',
    iconName: 'Sparkles',
  },
  {
    id: 'p2',
    title: 'Authentic Craftsmanship',
    description: 'Directly sourced from traditional master weavers and embroiderers across India.',
    iconName: 'HeartHandshake',
  },
  {
    id: 'p3',
    title: 'Quality Checked',
    description: 'Every set undergoes rigorous 3-step hand inspection before dispatch.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'p4',
    title: 'Fast & Secure Delivery',
    description: 'Free express doorstep delivery with hassle-free 7-day easy returns.',
    iconName: 'Truck',
  },
];

export const WhyGaurangi: React.FC = () => {
  const { data } = useContent();

  if (data.hiddenSections?.whyGaurangi) return null;

  const pillars = data.whyGaurangiPillars && data.whyGaurangiPillars.length > 0
    ? data.whyGaurangiPillars
    : DEFAULT_PILLARS;

  if (pillars.length === 0) return null;

  const getIcon = (name?: string) => {
    switch (name) {
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#C5A059]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-[#C5A059]" />;
      case 'Truck': return <Truck className="w-6 h-6 text-[#C5A059]" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-6 h-6 text-[#C5A059]" />;
    }
  };

  const getGridColsClass = (count: number) => {
    if (count === 1) return 'grid-cols-1 max-w-md mx-auto';
    if (count === 2) return 'grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto';
    if (count === 3) return 'grid-cols-1 sm:grid-cols-3 max-w-5xl mx-auto';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
  };

  return (
    <section id="about" className="py-16 bg-[#F3EFEA] border-b border-[#EAE5D9]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        {/* Section Header */}
        <div className="max-w-xl mx-auto mb-12">
          {(data.sectionHeaders?.whyGaurangiBadge !== undefined ? data.sectionHeaders.whyGaurangiBadge : 'Why Shop With Us') && (
            <span className="text-[0.72rem] tracking-[0.3em] uppercase text-[#C5A059] font-medium block mb-2">
              {data.sectionHeaders?.whyGaurangiBadge || 'Why Shop With Us'}
            </span>
          )}
          {(data.sectionHeaders?.whyGaurangiTitle !== undefined ? data.sectionHeaders.whyGaurangiTitle : 'The Gaurangi Guarantee') && (
            <h2 className="font-serif-editorial text-3xl md:text-4xl text-[#7A1C30] font-normal tracking-wide">
              {data.sectionHeaders?.whyGaurangiTitle || 'The Gaurangi Guarantee'}
            </h2>
          )}
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-4" />
        </div>

        {/* Dynamic Pillars Grid */}
        <div className={`grid gap-8 ${getGridColsClass(pillars.length)}`}>
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#FAF6EE] border border-[#EAE5D9] transition-transform duration-300 hover:-translate-y-1 hover:shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-[#F3EFEA] border border-[#C5A059]/40 flex items-center justify-center mb-4">
                {getIcon(pillar.iconName)}
              </div>
              {pillar.title && (
                <h3 className="font-serif-editorial text-lg text-[#7A1C30] font-medium mb-2">
                  {pillar.title}
                </h3>
              )}
              {pillar.description && (
                <p className="text-xs text-gray-600 font-light leading-relaxed">
                  {pillar.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
