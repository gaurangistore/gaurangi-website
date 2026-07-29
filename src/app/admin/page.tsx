'use client';

import React, { useState } from 'react';
import { useContent, HomepageData, HeroSlide, CollectionItem, ProductItem, OccasionItem, CustomerStoryItem } from '@/context/ContentContext';
import { Sparkles, Save, Upload, Plus, Trash2, CheckCircle, Image as ImageIcon, Home, Layers, ShoppingBag, Quote, PhoneCall, ShieldCheck, Tag } from 'lucide-react';
import Link from 'next/link';
import { DUMMY_IMAGE } from '@/lib/constants';

export default function AdminDashboard() {
  const { data, saveData, uploadImage } = useContent();
  const [formData, setFormData] = useState<HomepageData>(data);
  const [activeTab, setActiveTab] = useState<'hero' | 'categories' | 'products' | 'whyGaurangi' | 'stories' | 'contact'>('hero');
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
            Gaurangi Fashions Admin Portal
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-white/30 hover:bg-white/10 flex items-center gap-2"
          >
            <Home size={14} /> View Live Site
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
          Changes Published Successfully! Your live website has been updated.
        </div>
      )}

      {/* Main Admin Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3 bg-white p-6 rounded-2xl border border-[#EAE5D9] shadow-sm flex flex-col gap-2 h-fit">
          <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[#C5A059] font-semibold mb-2 block">
            Homepage v2 Content
          </span>

          <button
            onClick={() => setActiveTab('hero')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-colors ${
              activeTab === 'hero' ? 'bg-[#7A1C30] text-white' : 'hover:bg-[#FAF6EE] text-[#1F1F1F]'
            }`}
          >
            <Layers size={16} /> 1. Hero Banner
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-colors ${
              activeTab === 'categories' ? 'bg-[#7A1C30] text-white' : 'hover:bg-[#FAF6EE] text-[#1F1F1F]'
            }`}
          >
            <Tag size={16} /> 2. Fabric Categories
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-colors ${
              activeTab === 'products' ? 'bg-[#7A1C30] text-white' : 'hover:bg-[#FAF6EE] text-[#1F1F1F]'
            }`}
          >
            <ShoppingBag size={16} /> 3. Dress Materials Catalog
          </button>

          <button
            onClick={() => setActiveTab('whyGaurangi')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-colors ${
              activeTab === 'whyGaurangi' ? 'bg-[#7A1C30] text-white' : 'hover:bg-[#FAF6EE] text-[#1F1F1F]'
            }`}
          >
            <ShieldCheck size={16} /> 4. Why Gaurangi (Trust)
          </button>

          <button
            onClick={() => setActiveTab('stories')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-colors ${
              activeTab === 'stories' ? 'bg-[#7A1C30] text-white' : 'hover:bg-[#FAF6EE] text-[#1F1F1F]'
            }`}
          >
            <Quote size={16} /> 5. Customer Reviews
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-colors ${
              activeTab === 'contact' ? 'bg-[#7A1C30] text-white' : 'hover:bg-[#FAF6EE] text-[#1F1F1F]'
            }`}
          >
            <PhoneCall size={16} /> 6. Boutique Contact Info
          </button>
        </aside>

        {/* Tab Content Editor Form Area */}
        <main className="lg:col-span-9 bg-white p-8 rounded-2xl border border-[#EAE5D9] shadow-sm">
          
          {/* TAB 1: HERO BANNER */}
          {activeTab === 'hero' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE5D9]">
                <div>
                  <h2 className="font-serif-editorial text-2xl text-[#7A1C30] font-medium">
                    Hero Banner Editor
                  </h2>
                  <p className="text-xs text-gray-500 font-light mt-1">
                    Author main headline, tagline, and model photography for the top hero section.
                  </p>
                </div>
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
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border transition-all ${
                    formData.hiddenSections?.heroBanner
                      ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  {formData.hiddenSections?.heroBanner ? '🔴 Section Hidden on Website' : '🟢 Section Visible on Website'}
                </button>
              </div>

              {(formData.heroSlides || []).map((slide, idx) => (
                <div key={slide.id || idx} className="p-6 bg-[#FAF6EE] rounded-xl border border-[#EAE5D9] space-y-4">
                  <h3 className="font-serif-editorial text-lg text-[#7A1C30]">Slide #{idx + 1} Settings</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Top Badge Text (Optional)</label>
                      <input
                        type="text"
                        value={slide.badge || ''}
                        onChange={(e) => {
                          const updated = [...formData.heroSlides];
                          updated[idx].badge = e.target.value;
                          setFormData({ ...formData, heroSlides: updated });
                        }}
                        placeholder="e.g. Unstitched Handloom Edit • 2026"
                        className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Headline Main Title</label>
                      <input
                        type="text"
                        value={slide.title || ''}
                        onChange={(e) => {
                          const updated = [...formData.heroSlides];
                          updated[idx].title = e.target.value;
                          setFormData({ ...formData, heroSlides: updated });
                        }}
                        placeholder="e.g. Timeless Dress Materials"
                        className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none focus:border-[#C5A059]"
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
                      className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  {/* Photo URL & Upload */}
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
                        placeholder="Image URL or upload file"
                        className="flex-1 px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none focus:border-[#C5A059]"
                      />
                      <label className="px-4 py-2 bg-[#7A1C30] text-white rounded-lg text-xs font-medium cursor-pointer hover:bg-[#5C1423]">
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

          {/* TAB 2: FABRIC CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE5D9]">
                <div>
                  <h2 className="font-serif-editorial text-2xl text-[#7A1C30] font-medium">
                    Fabric Categories Editor
                  </h2>
                  <p className="text-xs text-gray-500 font-light mt-1">
                    Author fabric tiles on the homepage (Pure Silk, Organza, Banarasi, Chanderi, Linen, Cotton).
                  </p>
                </div>
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
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border transition-all ${
                    formData.hiddenSections?.featuredCategories
                      ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  {formData.hiddenSections?.featuredCategories ? '🔴 Section Hidden on Website' : '🟢 Section Visible on Website'}
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {(formData.collections || []).map((col, idx) => (
                  <div key={col.id || idx} className="p-6 bg-[#FAF6EE] rounded-xl border border-[#EAE5D9] space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif-editorial text-base text-[#7A1C30] font-medium">Category #{idx + 1}</h3>
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
                        <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Category Title</label>
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
                        <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Subtitle / Weave Detail</label>
                        <input
                          type="text"
                          value={col.subtitle || ''}
                          onChange={(e) => {
                            const updated = [...formData.collections];
                            updated[idx].subtitle = e.target.value;
                            setFormData({ ...formData, collections: updated });
                          }}
                          placeholder="e.g. Lustrous Kanjivaram & Mulberry Silk Unstitched Fabrics"
                          className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                        />
                      </div>
                    </div>

                    {/* Image URL & Upload */}
                    <div>
                      <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Category Image</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={col.image || ''}
                          onChange={(e) => {
                            const updated = [...formData.collections];
                            updated[idx].image = e.target.value;
                            setFormData({ ...formData, collections: updated });
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
                                const updated = [...formData.collections];
                                updated[idx].image = url;
                                setFormData({ ...formData, collections: updated });
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
                  const newItem: CollectionItem = {
                    id: `col-${Date.now()}`,
                    title: 'New Fabric Category',
                    subtitle: 'Description of weave',
                    image: DUMMY_IMAGE,
                    tag: 'Handloom',
                  };
                  setFormData({ ...formData, collections: [...(formData.collections || []), newItem] });
                }}
                className="btn-maroon text-xs px-6 py-2.5 rounded-full flex items-center gap-2"
              >
                <Plus size={15} /> Add New Category Tile
              </button>
            </div>
          )}

          {/* TAB 3: DRESS MATERIALS PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE5D9]">
                <div>
                  <h2 className="font-serif-editorial text-2xl text-[#7A1C30] font-medium">
                    Dress Materials Products Catalog
                  </h2>
                  <p className="text-xs text-gray-500 font-light mt-1">
                    Manage unstitched dress material products, prices, fabric specifications, and photos.
                  </p>
                </div>
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
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border transition-all ${
                    formData.hiddenSections?.newArrivals
                      ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  {formData.hiddenSections?.newArrivals ? '🔴 Section Hidden on Website' : '🟢 Section Visible on Website'}
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {(formData.products || []).map((prod, idx) => (
                  <div key={prod.id || idx} className="p-6 bg-[#FAF6EE] rounded-xl border border-[#EAE5D9] space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif-editorial text-base text-[#7A1C30] font-medium">Product #{idx + 1}: {prod.name}</h3>
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
                          placeholder="Product Name"
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
                          placeholder="e.g. Pure Silk / Chanderi"
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

                    {/* Image URL & Upload */}
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
          )}

          {/* TAB 4: WHY GAURANGI TRUST PILLARS */}
          {activeTab === 'whyGaurangi' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE5D9]">
                <div>
                  <h2 className="font-serif-editorial text-2xl text-[#7A1C30] font-medium">
                    Why Gaurangi (Trust Pillars) Editor
                  </h2>
                  <p className="text-xs text-gray-500 font-light mt-1">
                    Manage the 4 trust pillars on your homepage.
                  </p>
                </div>
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
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border transition-all ${
                    formData.hiddenSections?.whyGaurangi
                      ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  {formData.hiddenSections?.whyGaurangi ? '🔴 Section Hidden on Website' : '🟢 Section Visible on Website'}
                </button>
              </div>

              <div className="p-6 bg-[#FAF6EE] rounded-xl border border-[#EAE5D9] space-y-4">
                <p className="text-xs text-[#7A1C30] font-medium">
                  The trust section features 4 pillars: Premium Fabrics, Authentic Craftsmanship, Quality Checked, and Fast Delivery. If left blank, individual items automatically adjust cleanly on the live site!
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: CUSTOMER REVIEWS */}
          {activeTab === 'stories' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE5D9]">
                <div>
                  <h2 className="font-serif-editorial text-2xl text-[#7A1C30] font-medium">
                    Customer Reviews Editor
                  </h2>
                  <p className="text-xs text-gray-500 font-light mt-1">
                    Author customer reviews. If un-authored or blank, reviews or optional labels will not render.
                  </p>
                </div>
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
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border transition-all ${
                    formData.hiddenSections?.customerStories
                      ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  {formData.hiddenSections?.customerStories ? '🔴 Section Hidden on Website' : '🟢 Section Visible on Website'}
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {(formData.customerStories || []).map((story, idx) => (
                  <div key={story.id || idx} className="p-6 bg-[#FAF6EE] rounded-xl border border-[#EAE5D9] space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif-editorial text-base text-[#7A1C30]">Review #{idx + 1}</h3>
                      <button
                        onClick={() => {
                          const updated = formData.customerStories.filter((_, i) => i !== idx);
                          setFormData({ ...formData, customerStories: updated });
                        }}
                        className="text-xs text-red-600 hover:underline flex items-center gap-1"
                      >
                        <Trash2 size={13} /> Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Customer Name</label>
                        <input
                          type="text"
                          value={story.name || ''}
                          onChange={(e) => {
                            const updated = [...formData.customerStories];
                            updated[idx].name = e.target.value;
                            setFormData({ ...formData, customerStories: updated });
                          }}
                          placeholder="e.g. Priya Sharma"
                          className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Location / Occasion (Optional)</label>
                        <input
                          type="text"
                          value={story.location || ''}
                          onChange={(e) => {
                            const updated = [...formData.customerStories];
                            updated[idx].location = e.target.value;
                            setFormData({ ...formData, customerStories: updated });
                          }}
                          placeholder="e.g. Mumbai • Wedding Edit"
                          className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Review Quote</label>
                      <textarea
                        value={story.quote || ''}
                        rows={2}
                        onChange={(e) => {
                          const updated = [...formData.customerStories];
                          updated[idx].quote = e.target.value;
                          setFormData({ ...formData, customerStories: updated });
                        }}
                        placeholder="Write customer review quote..."
                        className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: BOUTIQUE CONTACT INFO */}
          {activeTab === 'contact' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE5D9]">
                <div>
                  <h2 className="font-serif-editorial text-2xl text-[#7A1C30] font-medium">
                    Boutique Contact Info
                  </h2>
                  <p className="text-xs text-gray-500 font-light mt-1">
                    Author store details, phone, email, and address.
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
                  <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Boutique Address</label>
                  <textarea
                    value={formData.contactInfo?.address || ''}
                    rows={2}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        contactInfo: { ...formData.contactInfo, address: e.target.value },
                      });
                    }}
                    placeholder="Enter store physical address"
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
