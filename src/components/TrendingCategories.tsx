'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface CategoryTab {
  id: string;
  name: string;
  count: string;
  image: string;
  description: string;
}

const CATEGORIES: CategoryTab[] = [
  {
    id: 'dress-materials',
    name: 'Dress Materials',
    count: '34 Curated Edits',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1000&auto=format&fit=crop',
    description: 'Unstitched pure silks, hand-embroidered organza & linen coordinates ready for bespoke tailoring.',
  },
  {
    id: 'heritage-sarees',
    name: 'Heritage Sarees',
    count: '42 Masterpieces',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop',
    description: 'Kanjivarams, Banarasis, Chanderis & Tussars woven by master handloom weavers.',
  },
  {
    id: 'tailored-formals',
    name: 'Contemporary Wear',
    count: '28 Styles',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
    description: 'Structured linen resort shirts, fluid wide-leg trousers & unisex minimal blazers.',
  },
  {
    id: 'artisan-accessories',
    name: 'Artisan Accessories',
    count: '19 Fine Pieces',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop',
    description: 'Handcrafted gold vermeil jewelry, leather footwear, and silk drapes.',
  },
];

export const TrendingCategories: React.FC = () => {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0].id);

  const activeCategory = CATEGORIES.find((c) => c.id === activeTab) || CATEGORIES[0];

  return (
    <section className="py-24 bg-[#F3EFEA] border-y border-[#EAE5D9]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[0.72rem] tracking-[0.3em] uppercase text-[#C5A059] font-medium block mb-2">
              Dynamic Discovery
            </span>
            <h3 className="font-serif-editorial text-3xl md:text-4xl text-[#7A1C30] font-normal tracking-wide">
              Trending Categories
            </h3>
          </div>

          {/* Interactive Category Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs tracking-wider uppercase font-medium transition-all ${
                  activeTab === cat.id
                    ? 'bg-[#7A1C30] text-white shadow-md'
                    : 'bg-[#FAF6EE] text-[#1F1F1F] hover:bg-white border border-[#EAE5D9]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Category Feature Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF6EE] p-8 md:p-12 rounded-2xl border border-[#EAE5D9]">
          <div className="lg:col-span-7 relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
            <img
              src={activeCategory.image}
              alt={activeCategory.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center gap-6 lg:pl-6">
            <span className="text-xs font-semibold tracking-widest text-[#C5A059] uppercase">
              {activeCategory.count}
            </span>
            <h4 className="font-serif-editorial text-3xl md:text-4xl text-[#7A1C30] font-medium leading-tight">
              {activeCategory.name}
            </h4>
            <p className="text-sm font-light text-[#1F1F1F]/80 leading-relaxed font-sans">
              {activeCategory.description}
            </p>
            <div>
              <a href="#collections" className="btn-maroon text-xs">
                <span>View All In {activeCategory.name}</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
