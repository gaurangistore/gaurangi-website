'use client';

import React from 'react';
import Link from 'next/link';
import { useContent } from '@/context/ContentContext';
import { getImageUrl } from '@/lib/constants';

const OCCASIONS = [
  { id: 'everyday', label: 'Everyday', description: 'Effortless elegance for daily wear' },
  { id: 'work', label: 'Work', description: 'Refined pieces for the modern professional' },
  { id: 'festive', label: 'Festive', description: 'Celebrate in hand-cut heritage' },
  { id: 'wedding', label: 'Wedding', description: 'Statement pieces for special occasions' },
];

export const StyleInspiration: React.FC = () => {
  const { data } = useContent();
  const products = data.products || [];

  if (data.hiddenSections?.styleInspiration || products.length === 0) return null;

  // Use the first product image as a hero shot for the section
  const heroImage = products[0]?.image;

  return (
    <section id="style" className="py-16 md:py-20 bg-paper">
      <div className="wrap">
        <div className="section-head mb-10 md:mb-11">
          <span className="mono text-rose mb-2.5 block">How to wear it</span>
          <h2 className="font-display italic text-[clamp(30px,3.6vw,44px)] mb-3">
            One piece. Different occasions.
          </h2>
          <p className="max-w-[480px] text-ink-soft text-[14.5px]">
            Gaurangi appliqué transitions effortlessly from weekday to celebration — here&apos;s how to style it.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {OCCASIONS.map((occasion) => (
            <Link
              key={occasion.id}
              href={`/shop?category=${encodeURIComponent(occasion.label)}`}
              className="group text-center"
            >
              <div className="aspect-[3/4] overflow-hidden bg-[#EFE3DC] border border-border-hair mb-3">
                <img
                  src={getImageUrl(heroImage || '/images/model-dummy.jpg')}
                  alt={occasion.label}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h3 className="text-sm font-sans font-semibold mb-0.5">{occasion.label}</h3>
              <p className="text-xs text-ink-soft">{occasion.description}</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/shop" className="btn-outline">
            Shop all pieces →
          </Link>
        </div>
      </div>
    </section>
  );
};
