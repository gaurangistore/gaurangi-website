'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useContent } from '@/context/ContentContext';
import { ProductCard } from '@/components/ProductCard';

export const NewArrivals: React.FC = () => {
  const { data } = useContent();
  const searchParams = useSearchParams();
  const techniqueParam = searchParams.get('technique');

  const products = data.products || [];

  if (data.hiddenSections?.newArrivals || products.length === 0) return null;

  const header = data.sectionHeaders || {};
  const technique =
    techniqueParam && techniqueParam !== 'all'
      ? (data.collections || []).find((c) => c.id === techniqueParam)
      : null;

  const filtered = technique ? products.filter((p) => p.technique === technique.id) : null;
  const visible = filtered || products.slice(0, 8);

  return (
    <section id="new" className="py-16 md:py-20">
      <div className="wrap">
        <div className="section-head flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-11">
          <div>
            {header.newArrivalsBadge && (
              <span className="mono text-rose mb-2.5 block">
                {technique ? technique.title : header.newArrivalsBadge}
              </span>
            )}
            <h2 className="font-display italic text-[clamp(30px,3.6vw,44px)]">
              {technique
                ? `${technique.title} new arrivals`
                : header.newArrivalsTitle || 'New arrivals'}
            </h2>
          </div>
          <div className="max-w-[380px]">
            <p className="text-ink-soft text-[14.5px]">
              {technique
                ? `Every current ${technique.title} piece in stock — suit sets, dupattas and home textiles.`
                : 'Real pieces, real photography — this is our current stock across suit sets, dupattas and home textiles.'}
              <br />
              <span className="mono text-rose">
                * Estimated pricing from comparable market listings — pending your actual costs.
              </span>
            </p>
            {technique && (
              <Link href="/#new" className="btn-outline mt-4 inline-block">
                Show all new arrivals
              </Link>
            )}
          </div>
        </div>

        {visible.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="font-display italic text-2xl mb-2">Nothing here yet</p>
            <p className="text-ink-soft text-sm">
              {technique
                ? `No ${technique.title} pieces listed yet — check back soon.`
                : 'Pieces are being added — check back soon.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
