'use client';

import React, { useState } from 'react';
import { useContent, HomepageData, HeroSlide, CollectionItem, ProductItem, CustomerStoryItem } from '@/context/ContentContext';
import { Sparkles, Save, Plus, Trash2, CheckCircle, Home, Layers, ShoppingBag, Quote, PhoneCall, ShieldCheck, Tag, Info, Package, Settings, Eye } from 'lucide-react';
import Link from 'next/link';
import { DUMMY_IMAGE } from '@/lib/constants';

export default function AdminDashboard() {
  const { data, saveData, uploadImage } = useContent();
  const [formData, setFormData] = useState<HomepageData>(data);
  const [activePageTab, setActivePageTab] = useState<'homepage' | 'catalogPage' | 'productDetailsPage' | 'aboutPage' | 'contactFooter'>('homepage');
  const [activeHomeSubtab, setActiveHomeSubtab] = useState<'hero' | 'categories' | 'products' | 'whyGaurangi' | 'stories'>('hero');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Sync state if context data updates
  React.useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleSave = async () => {
    setIsSaving(true);
    const success = await saveData(formData);
    setIsSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    }
  };

  // Image Upload Handler helper
  const handleImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onUploadComplete: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        const uploadedUrl = await uploadImage(base64, file.name);
        onUploadComplete(uploadedUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1F1F1F] flex flex-col font-sans">
      
      {/* Top Admin Navigation Header */}
      <header className="bg-[#7A1C30] text-white py-4 px-6 md:px-12 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-[#C5A059]" />
          <h1 className="font-serif-editorial text-xl md:text-2xl font-medium tracking-wider uppercase">
            Gaurangi Page-Based CMS Portal
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-white/30 hover:bg-white/10 flex items-center gap-2"
          >
            <Home size={14} /> View Live Website
          </Link>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn-maroon bg-[#C5A059] text-[#7A1C30] hover:bg-white text-xs px-5 py-2.5 rounded-full font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg"
          >
            <Save size={15} /> {isSaving ? 'Publishing...' : 'Publish Changes'}
          </button>
        </div>
      </header>

      {/* Save Success Banner */}
      {saveSuccess && (
        <div className="bg-[#10B981] text-white px-6 py-3 text-center text-sm font-medium flex items-center justify-center gap-2 shadow-sm animate-fade-in">
          <CheckCircle size={18} />
          Changes Published Successfully! All website pages have been updated live.
        </div>
      )}

      {/* Main Admin Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Page Selector Sidebar Navigation */}
        <aside className="lg:col-span-3 bg-white p-6 rounded-2xl border border-[#EAE5D9] shadow-sm flex flex-col gap-2 h-fit">
          <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[#C5A059] font-semibold mb-2 block">
            Select Website Page to Author
          </span>

          {/* PAGE 1: HOMEPAGE */}
          <button
            onClick={() => setActivePageTab('homepage')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-colors ${
              activePageTab === 'homepage' ? 'bg-[#7A1C30] text-white' : 'hover:bg-[#FAF6EE] text-[#1F1F1F]'
            }`}
          >
            <Home size={16} /> 🏠 Page 1: Homepage (/)
          </button>

          {/* PAGE 2: DRESS MATERIALS CATALOG PAGE */}
          <button
            onClick={() => setActivePageTab('catalogPage')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-colors ${
              activePageTab === 'catalogPage' ? 'bg-[#7A1C30] text-white' : 'hover:bg-[#FAF6EE] text-[#1F1F1F]'
            }`}
          >
            <Tag size={16} /> 👗 Page 2: Dress Materials Catalog (/dress-materials)
          </button>

          {/* PAGE 3: PRODUCT DETAILS PAGE */}
          <button
            onClick={() => setActivePageTab('productDetailsPage')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-colors ${
              activePageTab === 'productDetailsPage' ? 'bg-[#7A1C30] text-white' : 'hover:bg-[#FAF6EE] text-[#1F1F1F]'
            }`}
          >
            <Package size={16} /> 🛍️ Page 3: Product Details (/product/[id])
          </button>

          {/* PAGE 4: ABOUT & BRAND STORY */}
          <button
            onClick={() => setActivePageTab('aboutPage')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-colors ${
              activePageTab === 'aboutPage' ? 'bg-[#7A1C30] text-white' : 'hover:bg-[#FAF6EE] text-[#1F1F1F]'
            }`}
          >
            <Info size={16} /> 📖 Page 4: About Story (/#about)
          </button>

          {/* PAGE 5: CONTACT & FOOTER */}
          <button
            onClick={() => setActivePageTab('contactFooter')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-colors ${
              activePageTab === 'contactFooter' ? 'bg-[#7A1C30] text-white' : 'hover:bg-[#FAF6EE] text-[#1F1F1F]'
            }`}
          >
            <PhoneCall size={16} /> 📞 Page 5: Contact & Footer (/#contact)
          </button>
        </aside>

        {/* Tab Content Editor Form Area */}
        <main className="lg:col-span-9 bg-white p-8 rounded-2xl border border-[#EAE5D9] shadow-sm">
          
          {/* ========================================== */}
          {/* PAGE 1: HOMEPAGE AUTHORING                 */}
          {/* ========================================== */}
          {activePageTab === 'homepage' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE5D9]">
                <div>
                  <h2 className="font-serif-editorial text-2xl text-[#7A1C30] font-medium">
                    Page 1: Homepage (/) Editor
                  </h2>
                  <p className="text-xs text-gray-500 font-light mt-1">
                    Author all hero banners, fabric categories, trust pillars, and customer reviews on the main landing page.
                  </p>
                </div>
              </div>

              {/* Sub-tabs for Homepage Sections */}
              <div className="flex flex-wrap gap-2 border-b border-[#EAE5D9] pb-4">
                <button
                  onClick={() => setActiveHomeSubtab('hero')}
                  className={`px-4 py-2 rounded-lg text-xs uppercase font-medium transition-colors ${
                    activeHomeSubtab === 'hero' ? 'bg-[#7A1C30] text-white' : 'bg-[#FAF6EE] text-[#1F1F1F]'
                  }`}
                >
                  👑 1. Hero Banner
                </button>
                <button
                  onClick={() => setActiveHomeSubtab('categories')}
                  className={`px-4 py-2 rounded-lg text-xs uppercase font-medium transition-colors ${
                    activeHomeSubtab === 'categories' ? 'bg-[#7A1C30] text-white' : 'bg-[#FAF6EE] text-[#1F1F1F]'
                  }`}
                >
                  🧵 2. Fabric Categories
                </button>
                <button
                  onClick={() => setActiveHomeSubtab('products')}
                  className={`px-4 py-2 rounded-lg text-xs uppercase font-medium transition-colors ${
                    activeHomeSubtab === 'products' ? 'bg-[#7A1C30] text-white' : 'bg-[#FAF6EE] text-[#1F1F1F]'
                  }`}
                >
                  👗 3. Featured Products
                </button>
                <button
                  onClick={() => setActiveHomeSubtab('whyGaurangi')}
                  className={`px-4 py-2 rounded-lg text-xs uppercase font-medium transition-colors ${
                    activeHomeSubtab === 'whyGaurangi' ? 'bg-[#7A1C30] text-white' : 'bg-[#FAF6EE] text-[#1F1F1F]'
                  }`}
                >
                  🛡️ 4. Why Gaurangi (Trust)
                </button>
                <button
                  onClick={() => setActiveHomeSubtab('stories')}
                  className={`px-4 py-2 rounded-lg text-xs uppercase font-medium transition-colors ${
                    activeHomeSubtab === 'stories' ? 'bg-[#7A1C30] text-white' : 'bg-[#FAF6EE] text-[#1F1F1F]'
                  }`}
                >
                  💬 5. Reviews
                </button>
              </div>

              {/* Subtab 1: Hero Banner */}
              {activeHomeSubtab === 'hero' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between bg-[#FAF6EE] p-4 rounded-xl border border-[#EAE5D9]">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#7A1C30]">
                      Hero Banner Visibility Control
                    </span>
                    <button
                      onClick={() => {
                        setFormData({
                          ...formData,
                          hiddenSections: {
                            ...formData.hiddenSections,
                            heroBanner: !formData.hiddenSections?.heroBanner,
                          },
                        });
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                        formData.hiddenSections?.heroBanner
                          ? 'bg-red-50 text-red-600 border-red-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {formData.hiddenSections?.heroBanner ? '🔴 Hidden on Homepage' : '🟢 Visible on Homepage'}
                    </button>
                  </div>

                  {(formData.heroSlides || []).map((slide, idx) => (
                    <div key={slide.id || idx} className="p-6 bg-[#FAF6EE] rounded-xl border border-[#EAE5D9] space-y-4">
                      <h3 className="font-serif-editorial text-lg text-[#7A1C30]">Hero Slide #{idx + 1}</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Top Badge Text</label>
                          <input
                            type="text"
                            value={slide.badge || ''}
                            onChange={(e) => {
                              const updated = [...formData.heroSlides];
                              updated[idx].badge = e.target.value;
                              setFormData({ ...formData, heroSlides: updated });
                            }}
                            placeholder="e.g. Unstitched Handloom Edit • 2026"
                            className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Main Headline Title</label>
                          <input
                            type="text"
                            value={slide.title || ''}
                            onChange={(e) => {
                              const updated = [...formData.heroSlides];
                              updated[idx].title = e.target.value;
                              setFormData({ ...formData, heroSlides: updated });
                            }}
                            placeholder="e.g. Timeless Dress Materials"
                            className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Subheadline / Tagline</label>
                        <textarea
                          value={slide.tagline || ''}
                          rows={2}
                          onChange={(e) => {
                            const updated = [...formData.heroSlides];
                            updated[idx].tagline = e.target.value;
                            setFormData({ ...formData, heroSlides: updated });
                          }}
                          placeholder="e.g. Crafted for celebrations, designed for everyday elegance."
                          className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Hero Image</label>
                        <div className="flex items-center gap-3">
                          <input
                            type="text"
                            value={slide.image || ''}
                            onChange={(e) => {
                              const updated = [...formData.heroSlides];
                              updated[idx].image = e.target.value;
                              setFormData({ ...formData, heroSlides: updated });
                            }}
                            className="flex-1 px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                          />
                          <label className="px-4 py-2 bg-[#7A1C30] text-white rounded-lg text-xs font-medium cursor-pointer">
                            Upload Photo
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleImageFileChange(e, (url) => {
                                  const updated = [...formData.heroSlides];
                                  updated[idx].image = url;
                                  setFormData({ ...formData, heroSlides: updated });
                                })
                              }
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Subtab 2: Fabric Categories */}
              {activeHomeSubtab === 'categories' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between bg-[#FAF6EE] p-4 rounded-xl border border-[#EAE5D9]">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#7A1C30]">
                      Fabric Categories Visibility Control
                    </span>
                    <button
                      onClick={() => {
                        setFormData({
                          ...formData,
                          hiddenSections: {
                            ...formData.hiddenSections,
                            featuredCategories: !formData.hiddenSections?.featuredCategories,
                          },
                        });
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                        formData.hiddenSections?.featuredCategories
                          ? 'bg-red-50 text-red-600 border-red-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {formData.hiddenSections?.featuredCategories ? '🔴 Hidden on Homepage' : '🟢 Visible on Homepage'}
                    </button>
                  </div>

                  {/* Authorable Section Header & Link Settings */}
                  <div className="p-6 bg-[#FAF6EE] rounded-xl border border-[#EAE5D9] space-y-4">
                    <h3 className="font-serif-editorial text-base text-[#7A1C30]">Section Header & Link Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Top Badge Text</label>
                        <input
                          type="text"
                          value={formData.sectionHeaders?.categoriesBadge || ''}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              sectionHeaders: {
                                ...formData.sectionHeaders,
                                categoriesBadge: e.target.value,
                              },
                            });
                          }}
                          placeholder="e.g. Explore Weaves"
                          className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Section Main Title</label>
                        <input
                          type="text"
                          value={formData.sectionHeaders?.categoriesTitle || ''}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              sectionHeaders: {
                                ...formData.sectionHeaders,
                                categoriesTitle: e.target.value,
                              },
                            });
                          }}
                          placeholder="e.g. Featured Fabric Categories"
                          className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Link Title / Button Text</label>
                        <input
                          type="text"
                          value={formData.sectionHeaders?.categoriesLinkText || ''}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              sectionHeaders: {
                                ...formData.sectionHeaders,
                                categoriesLinkText: e.target.value,
                              },
                            });
                          }}
                          placeholder="e.g. View All Dress Materials →"
                          className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Link Destination URL</label>
                        <input
                          type="text"
                          value={formData.sectionHeaders?.categoriesLinkUrl || '/dress-materials'}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              sectionHeaders: {
                                ...formData.sectionHeaders,
                                categoriesLinkUrl: e.target.value,
                              },
                            });
                          }}
                          placeholder="e.g. /dress-materials"
                          className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {(formData.collections || []).map((col, idx) => (
                      <div key={col.id || idx} className="p-6 bg-[#FAF6EE] rounded-xl border border-[#EAE5D9] space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-serif-editorial text-base text-[#7A1C30]">Category #{idx + 1}</h3>
                          <button
                            onClick={() => {
                              const updated = formData.collections.filter((_, i) => i !== idx);
                              setFormData({ ...formData, collections: updated });
                            }}
                            className="text-xs text-red-600 hover:underline flex items-center gap-1"
                          >
                            <Trash2 size={13} /> Remove
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Title</label>
                            <input
                              type="text"
                              value={col.title || ''}
                              onChange={(e) => {
                                const updated = [...formData.collections];
                                updated[idx].title = e.target.value;
                                setFormData({ ...formData, collections: updated });
                              }}
                              placeholder="e.g. Pure Silk"
                              className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Subtitle</label>
                            <input
                              type="text"
                              value={col.subtitle || ''}
                              onChange={(e) => {
                                const updated = [...formData.collections];
                                updated[idx].subtitle = e.target.value;
                                setFormData({ ...formData, collections: updated });
                              }}
                              placeholder="e.g. Lustrous Kanjivaram & Mulberry Silk"
                              className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Subtab 3: Featured Products */}
              {activeHomeSubtab === 'products' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between bg-[#FAF6EE] p-4 rounded-xl border border-[#EAE5D9]">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#7A1C30]">
                      Homepage New Arrivals Section Control
                    </span>
                    <button
                      onClick={() => {
                        setFormData({
                          ...formData,
                          hiddenSections: {
                            ...formData.hiddenSections,
                            newArrivals: !formData.hiddenSections?.newArrivals,
                          },
                        });
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                        formData.hiddenSections?.newArrivals
                          ? 'bg-red-50 text-red-600 border-red-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {formData.hiddenSections?.newArrivals ? '🔴 Hidden on Homepage' : '🟢 Visible on Homepage'}
                    </button>
                  </div>

                  <p className="text-xs text-gray-600">
                    Manage full product list under <strong>Page 2: Dress Materials Catalog</strong>. Up to 8 products are featured on the homepage.
                  </p>
                </div>
              )}

              {/* Subtab 4: Why Gaurangi */}
              {activeHomeSubtab === 'whyGaurangi' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between bg-[#FAF6EE] p-4 rounded-xl border border-[#EAE5D9]">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#7A1C30]">
                      Why Gaurangi Trust Section Control
                    </span>
                    <button
                      onClick={() => {
                        setFormData({
                          ...formData,
                          hiddenSections: {
                            ...formData.hiddenSections,
                            whyGaurangi: !formData.hiddenSections?.whyGaurangi,
                          },
                        });
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                        formData.hiddenSections?.whyGaurangi
                          ? 'bg-red-50 text-red-600 border-red-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {formData.hiddenSections?.whyGaurangi ? '🔴 Hidden on Homepage' : '🟢 Visible on Homepage'}
                    </button>
                  </div>

                  {/* Section Header Controls */}
                  <div className="p-6 bg-[#FAF6EE] rounded-xl border border-[#EAE5D9] space-y-4">
                    <h3 className="font-serif-editorial text-base text-[#7A1C30]">Section Header Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Top Badge Text</label>
                        <input
                          type="text"
                          value={formData.sectionHeaders?.whyGaurangiBadge || ''}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              sectionHeaders: {
                                ...formData.sectionHeaders,
                                whyGaurangiBadge: e.target.value,
                              },
                            });
                          }}
                          placeholder="e.g. The Gaurangi Promise"
                          className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Section Main Title</label>
                        <input
                          type="text"
                          value={formData.sectionHeaders?.whyGaurangiTitle || ''}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              sectionHeaders: {
                                ...formData.sectionHeaders,
                                whyGaurangiTitle: e.target.value,
                              },
                            });
                          }}
                          placeholder="e.g. Why Choose Our Boutique"
                          className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Trust Pillars Item Manager */}
                  <div className="space-y-4">
                    <h3 className="font-serif-editorial text-lg text-[#7A1C30]">Trust Pillars Manager</h3>

                    <div className="grid grid-cols-1 gap-6">
                      {(formData.whyGaurangiPillars || []).map((pillar, idx) => (
                        <div key={pillar.id || idx} className="p-6 bg-[#FAF6EE] rounded-xl border border-[#EAE5D9] space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-serif-editorial text-base text-[#7A1C30]">Pillar #{idx + 1}</h4>
                            <button
                              onClick={() => {
                                const updated = (formData.whyGaurangiPillars || []).filter((_, i) => i !== idx);
                                setFormData({ ...formData, whyGaurangiPillars: updated });
                              }}
                              className="text-xs text-red-600 hover:underline flex items-center gap-1"
                            >
                              <Trash2 size={13} /> Remove
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Pillar Title</label>
                              <input
                                type="text"
                                value={pillar.title || ''}
                                onChange={(e) => {
                                  const updated = [...(formData.whyGaurangiPillars || [])];
                                  updated[idx].title = e.target.value;
                                  setFormData({ ...formData, whyGaurangiPillars: updated });
                                }}
                                placeholder="e.g. Premium Fabrics"
                                className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                              />
                            </div>

                            <div>
                              <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Icon Style</label>
                              <select
                                value={pillar.iconName || 'Sparkles'}
                                onChange={(e) => {
                                  const updated = [...(formData.whyGaurangiPillars || [])];
                                  updated[idx].iconName = e.target.value;
                                  setFormData({ ...formData, whyGaurangiPillars: updated });
                                }}
                                className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none bg-white"
                              >
                                <option value="Sparkles">Sparkles (Quality/Fabrics)</option>
                                <option value="HeartHandshake">Heart Handshake (Craftsmanship)</option>
                                <option value="ShieldCheck">Shield Check (Inspection/Guarantee)</option>
                                <option value="Truck">Truck (Delivery/Returns)</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Description</label>
                            <textarea
                              value={pillar.description || ''}
                              rows={2}
                              onChange={(e) => {
                                const updated = [...(formData.whyGaurangiPillars || [])];
                                updated[idx].description = e.target.value;
                                setFormData({ ...formData, whyGaurangiPillars: updated });
                              }}
                              placeholder="Pillar description..."
                              className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        const newPillar = {
                          id: `p-${Date.now()}`,
                          title: 'New Trust Pillar',
                          description: 'Description of commitment',
                          iconName: 'Sparkles',
                        };
                        setFormData({
                          ...formData,
                          whyGaurangiPillars: [...(formData.whyGaurangiPillars || []), newPillar],
                        });
                      }}
                      className="btn-maroon text-xs px-6 py-2.5 rounded-full flex items-center gap-2"
                    >
                      <Plus size={15} /> Add New Trust Pillar
                    </button>
                  </div>
                </div>
              )}

              {/* Subtab 5: Customer Reviews */}
              {activeHomeSubtab === 'stories' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between bg-[#FAF6EE] p-4 rounded-xl border border-[#EAE5D9]">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#7A1C30]">
                      Customer Reviews Section Control
                    </span>
                    <button
                      onClick={() => {
                        setFormData({
                          ...formData,
                          hiddenSections: {
                            ...formData.hiddenSections,
                            customerStories: !formData.hiddenSections?.customerStories,
                          },
                        });
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                        formData.hiddenSections?.customerStories
                          ? 'bg-red-50 text-red-600 border-red-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {formData.hiddenSections?.customerStories ? '🔴 Hidden on Homepage' : '🟢 Visible on Homepage'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================== */}
          {/* PAGE 2: DRESS MATERIALS CATALOG PAGE       */}
          {/* ========================================== */}
          {activePageTab === 'catalogPage' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE5D9]">
                <div>
                  <h2 className="font-serif-editorial text-2xl text-[#7A1C30] font-medium">
                    Page 2: Dress Materials Catalog (/dress-materials)
                  </h2>
                  <p className="text-xs text-gray-500 font-light mt-1">
                    Author catalog banner titles, fabric filters, and unstitched dress material products.
                  </p>
                </div>
              </div>

              {/* Catalog Banner Titles */}
              <div className="p-6 bg-[#FAF6EE] rounded-xl border border-[#EAE5D9] space-y-4">
                <h3 className="font-serif-editorial text-base text-[#7A1C30]">Page Header Banner</h3>
                
                <div>
                  <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Page Title</label>
                  <input
                    type="text"
                    value={formData.dressMaterialsPageContent?.bannerTitle || ''}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        dressMaterialsPageContent: {
                          ...formData.dressMaterialsPageContent,
                          bannerTitle: e.target.value,
                          bannerSubtitle: formData.dressMaterialsPageContent?.bannerSubtitle || '',
                          fabrics: formData.dressMaterialsPageContent?.fabrics || [],
                        },
                      });
                    }}
                    placeholder="e.g. Premium Dress Materials"
                    className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Page Subtitle</label>
                  <textarea
                    value={formData.dressMaterialsPageContent?.bannerSubtitle || ''}
                    rows={2}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        dressMaterialsPageContent: {
                          ...formData.dressMaterialsPageContent,
                          bannerSubtitle: e.target.value,
                          bannerTitle: formData.dressMaterialsPageContent?.bannerTitle || '',
                          fabrics: formData.dressMaterialsPageContent?.fabrics || [],
                        },
                      });
                    }}
                    placeholder="Page subtitle..."
                    className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                  />
                </div>
              </div>

              {/* Product Catalog List */}
              <div className="space-y-6">
                <h3 className="font-serif-editorial text-xl text-[#7A1C30]">Dress Materials Product Manager</h3>

                <div className="grid grid-cols-1 gap-6">
                  {(formData.products || []).map((prod, idx) => (
                    <div key={prod.id || idx} className="p-6 bg-[#FAF6EE] rounded-xl border border-[#EAE5D9] space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif-editorial text-base text-[#7A1C30]">Product #{idx + 1}: {prod.name}</h4>
                        <button
                          onClick={() => {
                            const updated = formData.products.filter((_, i) => i !== idx);
                            setFormData({ ...formData, products: updated });
                          }}
                          className="text-xs text-red-600 hover:underline flex items-center gap-1"
                        >
                          <Trash2 size={13} /> Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Product Title</label>
                          <input
                            type="text"
                            value={prod.name || ''}
                            onChange={(e) => {
                              const updated = [...formData.products];
                              updated[idx].name = e.target.value;
                              setFormData({ ...formData, products: updated });
                            }}
                            placeholder="Product Title"
                            className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Fabric Type</label>
                          <input
                            type="text"
                            value={prod.fabric || ''}
                            onChange={(e) => {
                              const updated = [...formData.products];
                              updated[idx].fabric = e.target.value;
                              setFormData({ ...formData, products: updated });
                            }}
                            placeholder="e.g. Pure Silk"
                            className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Price (₹)</label>
                          <input
                            type="text"
                            value={prod.price || ''}
                            onChange={(e) => {
                              const updated = [...formData.products];
                              updated[idx].price = e.target.value;
                              setFormData({ ...formData, products: updated });
                            }}
                            placeholder="e.g. ₹ 4,850"
                            className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Product Photo</label>
                        <div className="flex items-center gap-3">
                          <input
                            type="text"
                            value={prod.image || ''}
                            onChange={(e) => {
                              const updated = [...formData.products];
                              updated[idx].image = e.target.value;
                              setFormData({ ...formData, products: updated });
                            }}
                            className="flex-1 px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                          />
                          <label className="px-4 py-2 bg-[#7A1C30] text-white rounded-lg text-xs font-medium cursor-pointer">
                            Upload Photo
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleImageFileChange(e, (url) => {
                                  const updated = [...formData.products];
                                  updated[idx].image = url;
                                  setFormData({ ...formData, products: updated });
                                })
                              }
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    const newItem: ProductItem = {
                      id: `prod-${Date.now()}`,
                      name: 'New Dress Material Ensemble',
                      fabric: 'Pure Handloom Silk',
                      price: '₹ 3,500',
                      image: DUMMY_IMAGE,
                      category: 'Dress Material',
                    };
                    setFormData({ ...formData, products: [...(formData.products || []), newItem] });
                  }}
                  className="btn-maroon text-xs px-6 py-2.5 rounded-full flex items-center gap-2"
                >
                  <Plus size={15} /> Add New Dress Material Product
                </button>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* PAGE 3: PRODUCT DETAILS PAGE               */}
          {/* ========================================== */}
          {activePageTab === 'productDetailsPage' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE5D9]">
                <div>
                  <h2 className="font-serif-editorial text-2xl text-[#7A1C30] font-medium">
                    Page 3: Product Details (/product/[id]) Editor
                  </h2>
                  <p className="text-xs text-gray-500 font-light mt-1">
                    Author fabric set measurements, wash care instructions, policies, and direct WhatsApp ordering.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-[#FAF6EE] rounded-xl border border-[#EAE5D9] space-y-4">
                <h3 className="font-serif-editorial text-base text-[#7A1C30]">Default Fabric Metre Specs</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Kurta / Top Fabric</label>
                    <input
                      type="text"
                      value={formData.productPageSettings?.defaultTopMetres || '2.5 Metres'}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          productPageSettings: {
                            ...formData.productPageSettings,
                            defaultTopMetres: e.target.value,
                            defaultBottomMetres: formData.productPageSettings?.defaultBottomMetres || '',
                            defaultDupattaMetres: formData.productPageSettings?.defaultDupattaMetres || '',
                            defaultWashCare: formData.productPageSettings?.defaultWashCare || '',
                            shippingPolicyText: formData.productPageSettings?.shippingPolicyText || '',
                            returnPolicyText: formData.productPageSettings?.returnPolicyText || '',
                            whatsAppNumber: formData.productPageSettings?.whatsAppNumber || '',
                          },
                        });
                      }}
                      className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Salwar / Bottom Fabric</label>
                    <input
                      type="text"
                      value={formData.productPageSettings?.defaultBottomMetres || '2.5 Metres'}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          productPageSettings: {
                            ...formData.productPageSettings,
                            defaultBottomMetres: e.target.value,
                            defaultTopMetres: formData.productPageSettings?.defaultTopMetres || '',
                            defaultDupattaMetres: formData.productPageSettings?.defaultDupattaMetres || '',
                            defaultWashCare: formData.productPageSettings?.defaultWashCare || '',
                            shippingPolicyText: formData.productPageSettings?.shippingPolicyText || '',
                            returnPolicyText: formData.productPageSettings?.returnPolicyText || '',
                            whatsAppNumber: formData.productPageSettings?.whatsAppNumber || '',
                          },
                        });
                      }}
                      className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Dupatta Fabric</label>
                    <input
                      type="text"
                      value={formData.productPageSettings?.defaultDupattaMetres || '2.25 Metres'}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          productPageSettings: {
                            ...formData.productPageSettings,
                            defaultDupattaMetres: e.target.value,
                            defaultTopMetres: formData.productPageSettings?.defaultTopMetres || '',
                            defaultBottomMetres: formData.productPageSettings?.defaultBottomMetres || '',
                            defaultWashCare: formData.productPageSettings?.defaultWashCare || '',
                            shippingPolicyText: formData.productPageSettings?.shippingPolicyText || '',
                            returnPolicyText: formData.productPageSettings?.returnPolicyText || '',
                            whatsAppNumber: formData.productPageSettings?.whatsAppNumber || '',
                          },
                        });
                      }}
                      className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Wash & Care Note</label>
                    <input
                      type="text"
                      value={formData.productPageSettings?.defaultWashCare || 'Dry Clean Only'}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          productPageSettings: {
                            ...formData.productPageSettings,
                            defaultWashCare: e.target.value,
                            defaultTopMetres: formData.productPageSettings?.defaultTopMetres || '',
                            defaultBottomMetres: formData.productPageSettings?.defaultBottomMetres || '',
                            defaultDupattaMetres: formData.productPageSettings?.defaultDupattaMetres || '',
                            shippingPolicyText: formData.productPageSettings?.shippingPolicyText || '',
                            returnPolicyText: formData.productPageSettings?.returnPolicyText || '',
                            whatsAppNumber: formData.productPageSettings?.whatsAppNumber || '',
                          },
                        });
                      }}
                      className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase font-medium text-gray-600 block mb-1">WhatsApp Direct Order Number</label>
                    <input
                      type="text"
                      value={formData.productPageSettings?.whatsAppNumber || '+919876543210'}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          productPageSettings: {
                            ...formData.productPageSettings,
                            whatsAppNumber: e.target.value,
                            defaultTopMetres: formData.productPageSettings?.defaultTopMetres || '',
                            defaultBottomMetres: formData.productPageSettings?.defaultBottomMetres || '',
                            defaultDupattaMetres: formData.productPageSettings?.defaultDupattaMetres || '',
                            defaultWashCare: formData.productPageSettings?.defaultWashCare || '',
                            shippingPolicyText: formData.productPageSettings?.shippingPolicyText || '',
                            returnPolicyText: formData.productPageSettings?.returnPolicyText || '',
                          },
                        });
                      }}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* PAGE 4: ABOUT & BRAND STORY               */}
          {/* ========================================== */}
          {activePageTab === 'aboutPage' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE5D9]">
                <div>
                  <h2 className="font-serif-editorial text-2xl text-[#7A1C30] font-medium">
                    Page 4: About & Brand Story (/#about)
                  </h2>
                  <p className="text-xs text-gray-500 font-light mt-1">
                    Author brand ethos, artisan heritage, and boutique storytelling.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-[#FAF6EE] rounded-xl border border-[#EAE5D9] space-y-4">
                <div>
                  <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Ethos Headline</label>
                  <input
                    type="text"
                    value={formData.aboutPageContent?.ethosTitle || ''}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        aboutPageContent: {
                          ...formData.aboutPageContent,
                          ethosTitle: e.target.value,
                          ethosSubtitle: formData.aboutPageContent?.ethosSubtitle || '',
                          heritageNarrative: formData.aboutPageContent?.heritageNarrative || '',
                        },
                      });
                    }}
                    placeholder="e.g. The Gaurangi Ethos"
                    className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Heritage Narrative Story</label>
                  <textarea
                    value={formData.aboutPageContent?.heritageNarrative || ''}
                    rows={4}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        aboutPageContent: {
                          ...formData.aboutPageContent,
                          heritageNarrative: e.target.value,
                          ethosTitle: formData.aboutPageContent?.ethosTitle || '',
                          ethosSubtitle: formData.aboutPageContent?.ethosSubtitle || '',
                        },
                      });
                    }}
                    placeholder="Write brand history..."
                    className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* PAGE 5: CONTACT & FOOTER                   */}
          {/* ========================================== */}
          {activePageTab === 'contactFooter' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE5D9]">
                <div>
                  <h2 className="font-serif-editorial text-2xl text-[#7A1C30] font-medium">
                    Page 5: Contact & Footer (/#contact)
                  </h2>
                  <p className="text-xs text-gray-500 font-light mt-1">
                    Author store details, phone, email, and physical address.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-[#FAF6EE] rounded-xl border border-[#EAE5D9] space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={formData.contactInfo?.phone || ''}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          contactInfo: { ...formData.contactInfo, phone: e.target.value },
                        });
                      }}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.contactInfo?.email || ''}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          contactInfo: { ...formData.contactInfo, email: e.target.value },
                        });
                      }}
                      placeholder="e.g. contact@gaurangifashions.com"
                      className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Boutique Physical Address</label>
                  <textarea
                    value={formData.contactInfo?.address || ''}
                    rows={2}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        contactInfo: { ...formData.contactInfo, address: e.target.value },
                      });
                    }}
                    placeholder="Enter store address..."
                    className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                  />
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
