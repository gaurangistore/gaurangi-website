'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Filter, Sparkles, Heart, Eye, ShoppingBag, X, ChevronDown, Check } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useContent, ProductItem } from '@/context/ContentContext';
import { getImageUrl } from '@/lib/constants';

const FABRIC_OPTIONS = [
  'All Fabrics',
  'Pure Silk',
  'Organza',
  'Banarasi Silk',
  'Chanderi',
  'Linen',
  'Tussar Silk',
  'Cotton',
];

const PRICE_OPTIONS = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹2,000', min: 0, max: 2000 },
  { label: '₹2,000 - ₹5,000', min: 2000, max: 5000 },
  { label: 'Above ₹5,000', min: 5000, max: Infinity },
];

const COLOR_OPTIONS = ['All Colors', 'Gold', 'Maroon', 'Ivory', 'Emerald', 'Royal Blue', 'Pastel Pink'];

export default function DressMaterialsPage() {
  const { data } = useContent();
  const rawProducts = data.products || [];

  const [selectedFabric, setSelectedFabric] = useState('All Fabrics');
  const [selectedPriceLabel, setSelectedPriceLabel] = useState('All Prices');
  const [selectedColor, setSelectedColor] = useState('All Colors');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Parse price helper
  const parsePrice = (priceStr?: string): number => {
    if (!priceStr) return 0;
    const num = parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
    return isNaN(num) ? 0 : num;
  };

  const filteredProducts = useMemo(() => {
    return rawProducts.filter((product) => {
      // Fabric Filter
      if (selectedFabric !== 'All Fabrics') {
        const productFabric = (product.fabric || '').toLowerCase();
        const targetFabric = selectedFabric.toLowerCase();
        if (!productFabric.includes(targetFabric)) {
          return false;
        }
      }

      // Price Filter
      if (selectedPriceLabel !== 'All Prices') {
        const priceObj = PRICE_OPTIONS.find((p) => p.label === selectedPriceLabel);
        if (priceObj) {
          const val = parsePrice(product.price);
          if (val < priceObj.min || val > priceObj.max) {
            return false;
          }
        }
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = (product.name || '').toLowerCase().includes(q);
        const matchesFabric = (product.fabric || '').toLowerCase().includes(q);
        const matchesCat = (product.category || '').toLowerCase().includes(q);
        if (!matchesName && !matchesFabric && !matchesCat) return false;
      }

      return true;
    });
  }, [rawProducts, selectedFabric, selectedPriceLabel, searchQuery]);

  const resetFilters = () => {
    setSelectedFabric('All Fabrics');
    setSelectedPriceLabel('All Prices');
    setSelectedColor('All Colors');
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedFabric !== 'All Fabrics' || selectedPriceLabel !== 'All Prices' || searchQuery !== '';

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1F1F1F] flex flex-col font-sans">
      <Navbar />

      {/* Page Hero Header */}
      <section className="py-16 px-6 md:px-12 bg-[#F3EFEA] border-b border-[#EAE5D9] text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="text-[0.72rem] tracking-[0.3em] uppercase text-[#C5A059] font-medium block">
            Boutique Unstitched Collection
          </span>
          { (data.dressMaterialsPageContent?.bannerTitle || 'Premium Dress Materials') && (
            <h1 className="font-serif-editorial text-4xl md:text-5xl text-[#7A1C30] font-light tracking-wide">
              {data.dressMaterialsPageContent?.bannerTitle || 'Premium Dress Materials'}
            </h1>
          )}
          { (data.dressMaterialsPageContent?.bannerSubtitle) && (
            <p className="text-sm font-light text-[#1F1F1F]/80 font-sans leading-relaxed max-w-xl mx-auto">
              {data.dressMaterialsPageContent.bannerSubtitle}
            </p>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 w-full flex-1">
        {/* Top Control Bar (Search, Mobile Filter Toggle, Active Count) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8 mb-8 border-b border-[#EAE5D9]">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full border border-[#C5A059] text-xs font-semibold uppercase text-[#7A1C30] bg-white shadow-sm"
            >
              <Filter size={14} /> Filters
            </button>

            <span className="text-xs text-gray-600 font-light tracking-wider">
              Showing <strong className="text-[#7A1C30] font-semibold">{filteredProducts.length}</strong> of{' '}
              {rawProducts.length} Dress Materials
            </span>
          </div>

          {/* Quick Search */}
          <div className="w-full md:w-72 relative">
            <input
              type="text"
              placeholder="Search silk, organza, zari..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pr-8 rounded-full border border-[#EAE5D9] bg-white text-xs text-[#1F1F1F] outline-none focus:border-[#C5A059] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Main Content Layout: Filters Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:flex flex-col gap-8 p-6 bg-[#F3EFEA] rounded-2xl border border-[#EAE5D9] sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE5D9]">
              <h3 className="font-serif-editorial text-lg text-[#7A1C30] font-medium flex items-center gap-2">
                <Filter size={16} className="text-[#C5A059]" /> Filter Catalog
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[0.68rem] text-[#7A1C30] hover:underline font-semibold uppercase tracking-widest"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Fabric Filter */}
            <div>
              <label className="text-[0.72rem] tracking-widest uppercase font-semibold text-[#C5A059] block mb-3">
                Fabric Type
              </label>
              <div className="flex flex-col gap-2">
                {FABRIC_OPTIONS.map((fab) => (
                  <button
                    key={fab}
                    onClick={() => setSelectedFabric(fab)}
                    className={`flex items-center justify-between text-xs py-1.5 px-3 rounded-lg text-left transition-all ${
                      selectedFabric === fab
                        ? 'bg-[#7A1C30] text-white font-medium shadow-sm'
                        : 'text-[#1F1F1F] hover:bg-white/60'
                    }`}
                  >
                    <span>{fab}</span>
                    {selectedFabric === fab && <Check size={12} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="pt-4 border-t border-[#EAE5D9]">
              <label className="text-[0.72rem] tracking-widest uppercase font-semibold text-[#C5A059] block mb-3">
                Price Range
              </label>
              <div className="flex flex-col gap-2">
                {PRICE_OPTIONS.map((price) => (
                  <button
                    key={price.label}
                    onClick={() => setSelectedPriceLabel(price.label)}
                    className={`flex items-center justify-between text-xs py-1.5 px-3 rounded-lg text-left transition-all ${
                      selectedPriceLabel === price.label
                        ? 'bg-[#7A1C30] text-white font-medium shadow-sm'
                        : 'text-[#1F1F1F] hover:bg-white/60'
                    }`}
                  >
                    <span>{price.label}</span>
                    {selectedPriceLabel === price.label && <Check size={12} />}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-[#F3EFEA] rounded-2xl border border-[#EAE5D9] p-8">
                <p className="font-serif-editorial text-2xl text-[#7A1C30] mb-2">No Dress Materials Found</p>
                <p className="text-xs text-gray-500 font-light mb-6">
                  Try adjusting your fabric or price filters to explore more options.
                </p>
                <button onClick={resetFilters} className="btn-maroon text-xs">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-[#FAF6EE] rounded-xl overflow-hidden border border-[#EAE5D9] transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
                  >
                    {/* Product Image */}
                    <Link href={`/product/${item.id}`} className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 block">
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                      />

                      {/* Fabric Badge */}
                      {item.fabric && (
                        <div className="absolute top-4 left-4">
                          <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[0.62rem] tracking-widest uppercase font-semibold text-[#7A1C30] border border-[#C5A059]/30">
                            {item.fabric}
                          </span>
                        </div>
                      )}

                      {/* Quick Action Pills */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          className="w-9 h-9 rounded-full bg-white/90 text-[#1F1F1F] hover:bg-[#7A1C30] hover:text-white flex items-center justify-center shadow-md transition-colors"
                          title="Wishlist"
                          onClick={(e) => e.preventDefault()}
                        >
                          <Heart size={16} />
                        </button>
                        <button
                          className="w-9 h-9 rounded-full bg-white/90 text-[#1F1F1F] hover:bg-[#7A1C30] hover:text-white flex items-center justify-center shadow-md transition-colors"
                          title="Quick View"
                          onClick={(e) => e.preventDefault()}
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </Link>

                    {/* Product Meta */}
                    <div className="p-5 flex flex-col justify-between flex-1 gap-3">
                      <div>
                        <Link href={`/product/${item.id}`}>
                          <h3 className="font-serif-editorial text-lg text-[#1F1F1F] font-medium leading-snug hover:text-[#7A1C30] transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        {item.category && (
                          <p className="text-xs text-gray-500 font-light mt-1">{item.category}</p>
                        )}
                      </div>

                      <div className="pt-3 border-t border-[#EAE5D9] flex items-center justify-between">
                        {item.price ? (
                          <span className="font-sans text-[#7A1C30] font-bold text-base">
                            {item.price}
                          </span>
                        ) : <div />}
                        <Link
                          href={`/product/${item.id}`}
                          className="text-xs tracking-wider uppercase font-semibold text-white bg-[#7A1C30] hover:bg-[#5C1423] px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1.5 shadow-sm"
                        >
                          <ShoppingBag size={13} /> View Specs
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
