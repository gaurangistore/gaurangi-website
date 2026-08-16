'use client';

import React from 'react';
import Link from 'next/link';
import { useContent } from '@/context/ContentContext';

export const CraftSection: React.FC = () => {
  const { data } = useContent();

  if (data.hiddenSections?.craftSection) return null;

  const craft = data.craftPageContent;

  return (
    <div className="wrap">
      <section id="craft" className="craft bg-ink text-paper my-8 md:my-10">
        <div className="wrap grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12 md:py-16">
          <div>
            {craft?.heroBadge && (
              <span className="mono text-gold block mb-3.5">{craft.heroBadge}</span>
            )}
            <h2 className="text-paper font-display italic text-[clamp(30px,3.8vw,42px)] mb-5">
              {craft?.heroTitle || 'Applied, not printed. Layered, not flat.'}
            </h2>
            <p className="text-paper/75 text-[15px] max-w-[460px]">
              {craft?.heroSubtitle ||
                'Embroidery stitches thread onto one layer of fabric. Appliqué is slower: a second piece of cloth is cut by hand into shape, placed on top, then stitched down.'}
            </p>

            <div className="compare mt-7 flex flex-col gap-3.5">
              <div className="compare-row grid grid-cols-[120px_1fr] gap-4 text-[13px] border-t border-paper/15 pt-3.5">
                <span className="mono text-gold">Embroidery</span>
                <span className="text-paper/75">Thread stitched directly onto a single layer.</span>
              </div>
              <div className="compare-row grid grid-cols-[120px_1fr] gap-4 text-[13px] border-t border-paper/15 pt-3.5">
                <span className="mono text-gold">Appliqué</span>
                <span className="text-paper/75">A second fabric shape is cut, placed, then stitched — built in layers.</span>
              </div>
              <div className="compare-row grid grid-cols-[120px_1fr] gap-4 text-[13px] border-t border-paper/15 pt-3.5">
                <span className="mono text-gold">Origin</span>
                <span className="text-paper/75">
                  Pipili, Odisha — the same hands behind the appliqué canopies of the Jagannath tradition.
                </span>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/craft" className="link-under text-[13.5px] font-semibold border-b-2 border-paper pb-0.5 text-paper hover:text-gold hover:border-gold">
                Read the full story →
              </Link>
            </div>
          </div>

          {/* Layer diagram */}
          <div className="layer-diagram relative h-72 hidden md:block">
            <div className="plate absolute left-1/2 top-1/2 w-[78%] aspect-square -translate-x-1/2 -translate-y-1/2 bg-[#3a2830]" />
            <div className="plate absolute left-1/2 top-1/2 w-[56%] aspect-square -translate-x-1/2 -translate-y-[58%] bg-rose opacity-95" />
            <div className="plate absolute left-1/2 top-1/2 w-[38%] aspect-square -translate-x-1/2 -translate-y-[64%] bg-gold opacity-95" />
            <div className="plate absolute left-1/2 top-1/2 w-[22%] aspect-square -translate-x-1/2 -translate-y-[70%] bg-emerald" />
            <span className="mono absolute left-[4%] top-[8%] text-paper/50 text-[10.5px]">01 — BASE CLOTH</span>
            <span className="mono absolute right-[2%] top-[32%] text-paper/50 text-[10.5px]">03 — MOTIF SHAPE</span>
            <span className="mono absolute left-0 bottom-[6%] text-paper/50 text-[10.5px]">04 — EDGE STITCH</span>
          </div>
        </div>
      </section>
    </div>
  );
};
