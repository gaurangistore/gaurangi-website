'use client';

import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useContent } from '@/context/ContentContext';
import { ProductCard } from '@/components/ProductCard';
import { CATEGORY_FILTERS, TECHNIQUES } from '@/lib/constants';

export const ShopContent: React.FC = () => {
  const { data } = useContent();
  const searchParams = useSearchParams();

  const techniqueParam = searchParams.get('technique');
  const categoryParam = searchParams.get('category');
  const q = searchParams.get('q');

  const [technique, setTechnique] = useState<string>(techniqueParam || 'all');
  const [category, setCategory] = useState<string>(categoryParam || 'All');

  const [prevTechniqueParam, setPrevTechniqueParam] = useState(techniqueParam);
  const [prevCategoryParam, setPrevCategoryParam] = useState(categoryParam);

  if (prevTechniqueParam !== techniqueParam) {
    setPrevTechniqueParam(techniqueParam);
    setTechnique(techniqueParam || 'all');
  }
  if (prevCategoryParam !== categoryParam) {
    setPrevCategoryParam(categoryParam);
    setCategory(categoryParam || 'All');
  }

  const banner = data.dressMaterialsPageContent;

  const categoryFilters = (data.shopCategories?.length)
    ? ['All', ...data.shopCategories]
    : CATEGORY_FILTERS;

  const techList = (data.shopTechniques?.length)
    ? data.shopTechniques
    : TECHNIQUES.map((t) => ({ id: t.id, name: t.name }));

  const filtered = useMemo(() => {
    const products = data.products || [];
    return products.filter((p) => {
      if (technique !== 'all' && p.technique !== technique) return false;
      if (category !== 'All' && p.category !== category) return false;
      if (q) {
        const haystack = `${p.name} ${p.description || ''} ${p.category || ''} ${p.technique || ''}`.toLowerCase();
        if (!haystack.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [data.products, technique, category, q]);

  const activeTechniqueLabel =
    technique !== 'all'
      ? techList.find((t) => t.id === technique)?.name
      : null;

  return (
    <main className="flex-1 py-12 md:py-16">
      <div className="wrap">
        {/* Page Header Banner */}
        <div className="mb-10 md:mb-14">
          <span className="mono text-rose block mb-2.5">Shop</span>
          <h1 className="font-display italic text-[clamp(32px,4.5vw,52px)] leading-tight">
            {banner?.bannerTitle || 'Shop'}
          </h1>
          <p className="max-w-[520px] mt-3 text-ink-soft text-[15px]">
            {banner?.bannerSubtitle ||
              'Suit sets, dupattas and home textiles — every piece built on hand-cut Pipili appliqué.'}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categoryFilters.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-[11.5px] font-medium transition-colors min-h-[44px] ${
                category === cat
                  ? 'bg-ink text-paper'
                  : 'bg-paper border border-border-hair text-ink hover:border-rose'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Technique Chips (horizontal scroll on mobile) */}
        <div className="flex gap-2 mb-10 overflow-x-auto no-scrollbar -mx-5 px-5 md:mx-0 md:px-0">
          <button
            onClick={() => setTechnique('all')}
            className={`shrink-0 px-4 py-2 rounded-full text-[11.5px] font-medium transition-colors min-h-[44px] ${
              technique === 'all'
                ? 'bg-rose text-paper'
                : 'bg-transparent border border-border-hair text-ink hover:border-rose'
            }`}
          >
            All Techniques
          </button>
          {techList.map((t) => (
            <button
              key={t.id}
              onClick={() => setTechnique(t.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-[11.5px] font-medium transition-colors min-h-[44px] ${
                technique === t.id
                  ? 'bg-rose text-paper'
                  : 'bg-transparent border border-border-hair text-ink hover:border-rose'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Result Count */}
        <div className="flex items-center justify-between mb-8">
          <span className="mono text-ink-soft">
            {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
            {activeTechniqueLabel ? ` · ${activeTechniqueLabel}` : ''}
          </span>
        </div>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-display italic text-2xl mb-2">Nothing here yet</p>
            <p className="text-ink-soft text-sm">
              Try clearing the filters or searching for something else.
            </p>
            <button
              onClick={() => {
                setTechnique('all');
                setCategory('All');
              }}
              className="btn-outline mt-6"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
};
