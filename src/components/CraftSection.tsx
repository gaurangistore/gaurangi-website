'use client';

import React from 'react';
import Link from 'next/link';
import { useContent } from '@/context/ContentContext';

export const CraftSection: React.FC = () => {
  const { data } = useContent();

  if (data.hiddenSections?.craftSection) return null;

  const craft = data.craftPageContent;

  return (
    <section id="craft" className="py-16 md:py-20 bg-ink text-paper">
      <div className="wrap text-center">
        <span className="mono text-gold block mb-3">
          {craft?.heroBadge || 'From Pipili, Odisha'}
        </span>
        <h2 className="font-display italic text-paper text-[clamp(30px,3.8vw,44px)] mb-4">
          {craft?.heroTitle || 'Applied, not printed. Layered, not flat.'}
        </h2>
        <p className="text-paper/70 text-[15px] max-w-[520px] mx-auto mb-10">
          {craft?.heroSubtitle ||
            'Embroidery stitches thread onto one layer. Appliqué is slower: a second cloth is cut by hand, placed on top, then stitched down — built in layers.'}
        </p>

        {/* Three-step process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-[780px] mx-auto mb-10">
          {[
            { step: '01', label: 'Cut', desc: 'Motifs hand-cut from a second layer of cloth' },
            { step: '02', label: 'Layer', desc: 'Each shape is placed onto the base fabric' },
            { step: '03', label: 'Stitch', desc: 'Edges secured with fine needlework' },
          ].map((item) => (
            <div key={item.step} className="border border-paper/15 p-6 md:p-7 text-center">
              <span className="mono text-gold text-[11px] block mb-2">{item.step}</span>
              <h3 className="font-display italic text-xl text-paper mb-2">{item.label}</h3>
              <p className="text-paper/60 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <Link
          href="/craft"
          className="link-under text-[13.5px] font-semibold border-b-2 border-paper pb-0.5 text-paper hover:text-gold hover:border-gold"
        >
          Explore the craft →
        </Link>
      </div>
    </section>
  );
};
