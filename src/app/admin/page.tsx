'use client';

import React, { useState } from 'react';
import { useContent, HomepageData, ProductItem, CraftPageContent } from '@/context/ContentContext';
import { Sparkles, Save, Plus, Trash2, CheckCircle, AlertTriangle, Loader2, Home, ShoppingBag, PhoneCall, Info, Package, GripVertical, ArrowUp, ArrowDown, Download, Upload } from 'lucide-react';
import Link from 'next/link';
import { DUMMY_IMAGE, TECHNIQUES } from '@/lib/constants';

export default function AdminDashboard() {
  const { rawData, saveData, uploadImage } = useContent();
  const [formData, setFormData] = useState<HomepageData>(rawData);
  const [activePageTab, setActivePageTab] = useState<'homepage' | 'catalogPage' | 'productDetailsPage' | 'aboutPage' | 'contactFooter'>('homepage');
  const [activeHomeSubtab, setActiveHomeSubtab] = useState<'hero' | 'categories' | 'products' | 'whyGaurangi' | 'stories'>('hero');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Sync form state when context data loads or is saved
  const [prevData, setPrevData] = useState<HomepageData>(rawData);
  if (rawData !== prevData) {
    setPrevData(rawData);
    setFormData(rawData);
  }

  // Reorder product helper
  const moveProduct = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= (formData.products || []).length) return;
    const updated = [...(formData.products || [])];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setFormData({ ...formData, products: updated });
  };

  // Generate a URL-friendly slug from a title
  const slugify = (text: string): string =>
    (text || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-+/g, '-');

  // Technique options for the product form — includes techniques added in the admin
  const techniqueOptions = (formData.collections || []).length
    ? (formData.collections || []).map((c) => ({ id: c.id, label: c.title }))
    : TECHNIQUES.map((t) => ({ id: t.id, label: t.name }));

  // CSV Export Helper for Content Authors
  const handleExportCSV = () => {
    const products = formData.products || [];
    const headers = ['id', 'name', 'fabric', 'price', 'image', 'category', 'technique', 'topMetres', 'bottomFabric', 'bottomMetres', 'dupattaFabric', 'dupattaMetres', 'craft', 'washCare', 'badge', 'description', 'rating', 'reviewsCount'];
    
    const csvRows = [
      headers.join(','),
      ...products.map(p => headers.map(h => `"${(p[h as keyof ProductItem] || '').toString().replace(/"/g, '""')}"`).join(','))
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `gaurangi_products_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // CSV Import Helper for Content Authors
  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      const lines = text.split(/\r\n|\n/).filter(line => line.trim() !== '');
      if (lines.length < 2) return;

      const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
      const newProducts: ProductItem[] = [];

      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);
        const cleanedRow = row.map(cell => cell.trim().replace(/^"|"$/g, '').replace(/""/g, '"'));

        const prodObj: { [key: string]: string } = { id: `prod-${Date.now()}-${i}` };
        headers.forEach((header, colIdx) => {
          if (cleanedRow[colIdx] !== undefined) {
            prodObj[header] = cleanedRow[colIdx];
          }
        });

        if (prodObj.name) {
          newProducts.push(prodObj as unknown as ProductItem);
        }
      }

      if (newProducts.length > 0) {
        setFormData({ ...formData, products: newProducts });
        alert(`Successfully imported ${newProducts.length} products from CSV!`);
      }
    };
    reader.readAsText(file);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(false);
    const success = await saveData(formData);
    setIsSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } else {
      setSaveError(true);
      setTimeout(() => setSaveError(false), 6000);
    }
  };

  // Compress/downscale a data URL image in the browser so uploads stay fast
  // and small enough to survive the Firebase Storage / Firestore limits.
  const compressImage = (dataUrl: string, maxDim = 1200, quality = 0.85): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        try {
          const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
          const w = Math.max(1, Math.round(img.width * scale));
          const h = Math.max(1, Math.round(img.height * scale));
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(dataUrl);
            return;
          }
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } catch (err) {
          console.error('Image compression failed:', err);
          resolve(dataUrl);
        }
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  };

  // Image Upload Handler helper
  const handleImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onUploadComplete: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadMessage(null);
    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      try {
        const compressed = await compressImage(base64);
        const uploadedUrl = await uploadImage(compressed, file.name);
        onUploadComplete(uploadedUrl);
        setUploadMessage({ ok: true, text: `Photo uploaded successfully (${file.name}).` });
      } catch (err) {
        console.error('Image upload failed:', err);
        setUploadMessage({ ok: false, text: `Photo upload failed: ${err instanceof Error ? err.message : 'unknown error'}` });
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1F1F1F] flex flex-col font-sans">
      
      {/* Top Admin Navigation Header */}
      <header className="bg-[#0A2A54] text-white py-3 px-4 md:px-12 flex flex-wrap items-center justify-between gap-3 shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-[#E3B463] shrink-0" />
          <h1 className="font-serif-editorial text-base md:text-2xl font-medium tracking-wider uppercase leading-tight">
            Gaurangi Page-Based CMS Portal
          </h1>
        </div>

        <div className="flex items-center gap-3">
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
            className="bg-[#E3B463] text-[#0A2A54] hover:bg-white text-xs px-5 py-2.5 rounded-full font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg min-h-[44px]"
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

      {/* Save Error Banner */}
      {saveError && (
        <div className="bg-[#B91C1C] text-white px-6 py-3 text-center text-sm font-medium flex items-center justify-center gap-2 shadow-sm animate-fade-in">
          <AlertTriangle size={18} />
          Publish failed — changes were only saved in this browser. Check your Firebase connection and try again.
        </div>
      )}

      {/* Upload In Progress Banner */}
      {isUploading && (
        <div className="bg-[#C5A059] text-white px-6 py-3 text-center text-sm font-medium flex items-center justify-center gap-2 shadow-sm">
          <Loader2 size={18} className="animate-spin" />
          Uploading photo, please wait...
        </div>
      )}

      {/* Upload Result Banner */}
      {!isUploading && uploadMessage && (
        <div
          className={`px-6 py-3 text-center text-sm font-medium flex items-center justify-center gap-2 shadow-sm ${
            uploadMessage.ok ? 'bg-[#10B981] text-white' : 'bg-[#B91C1C] text-white'
          }`}
        >
          {uploadMessage.ok ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
          {uploadMessage.text}
        </div>
      )}

      {/* Main Admin Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-12 lg:grid lg:grid-cols-12 gap-8">
        
        {/* Page Selector Navigation — top tab rail on mobile, sidebar on desktop */}
        <aside className="lg:col-span-3 bg-white p-4 md:p-6 rounded-2xl border border-[#EAE5D9] shadow-sm mb-4 lg:mb-0">
          <span className="text-[0.65rem] tracking-[0.25em] uppercase text-[#C5A059] font-semibold mb-2 block lg:block">
            Select Website Page to Author
          </span>

          <div className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 pb-1 lg:pb-0">
            {/* PAGE 1: HOMEPAGE */}
            <button
              onClick={() => setActivePageTab('homepage')}
              className={`flex-1 lg:w-full shrink-0 text-left lg:text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-colors min-h-[48px] ${
                activePageTab === 'homepage' ? 'bg-[#7A1C30] text-white' : 'hover:bg-[#FAF6EE] text-[#1F1F1F]'
              }`}
            >
              <Home size={16} /> 🏠 Homepage (/)
            </button>

            {/* PAGE 2: SHOP / THE EDIT */}
            <button
              onClick={() => setActivePageTab('catalogPage')}
              className={`flex-1 lg:w-full shrink-0 text-left lg:text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-colors min-h-[48px] ${
                activePageTab === 'catalogPage' ? 'bg-[#7A1C30] text-white' : 'hover:bg-[#FAF6EE] text-[#1F1F1F]'
              }`}
            >
              <ShoppingBag size={16} /> 🛍️ Shop / The Edit (/shop)
            </button>

            {/* PAGE 3: PRODUCT DETAILS PAGE */}
            <button
              onClick={() => setActivePageTab('productDetailsPage')}
              className={`flex-1 lg:w-full shrink-0 text-left lg:text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-colors min-h-[48px] ${
                activePageTab === 'productDetailsPage' ? 'bg-[#7A1C30] text-white' : 'hover:bg-[#FAF6EE] text-[#1F1F1F]'
              }`}
            >
              <Package size={16} /> 🛍️ Product Details (/product/[id])
            </button>

            {/* PAGE 4: THE CRAFT */}
            <button
              onClick={() => setActivePageTab('aboutPage')}
              className={`flex-1 lg:w-full shrink-0 text-left lg:text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-colors min-h-[48px] ${
                activePageTab === 'aboutPage' ? 'bg-[#7A1C30] text-white' : 'hover:bg-[#FAF6EE] text-[#1F1F1F]'
              }`}
            >
              <Info size={16} /> 🎨 The Craft (/craft)
            </button>

            {/* PAGE 5: CONTACT & FOOTER */}
            <button
              onClick={() => setActivePageTab('contactFooter')}
              className={`flex-1 lg:w-full shrink-0 text-left lg:text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-colors min-h-[48px] ${
                activePageTab === 'contactFooter' ? 'bg-[#7A1C30] text-white' : 'hover:bg-[#FAF6EE] text-[#1F1F1F]'
              }`}
            >
              <PhoneCall size={16} /> 📞 Contact & Footer
            </button>
          </div>
        </aside>

        {/* Tab Content Editor Form Area */}
        <main className="lg:col-span-9 bg-white p-4 md:p-8 rounded-2xl border border-[#EAE5D9] shadow-sm">
          
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
                  className={`px-4 py-2 rounded-lg text-xs uppercase font-medium transition-colors min-h-[44px] ${
                    activeHomeSubtab === 'hero' ? 'bg-[#7A1C30] text-white' : 'bg-[#FAF6EE] text-[#1F1F1F]'
                  }`}
                >
                  👑 1. Hero Banner
                </button>
                <button
                  onClick={() => setActiveHomeSubtab('categories')}
                  className={`px-4 py-2 rounded-lg text-xs uppercase font-medium transition-colors min-h-[44px] ${
                    activeHomeSubtab === 'categories' ? 'bg-[#7A1C30] text-white' : 'bg-[#FAF6EE] text-[#1F1F1F]'
                  }`}
                >
                  🧵 2. Shop by Technique
                </button>
                <button
                  onClick={() => setActiveHomeSubtab('products')}
                  className={`px-4 py-2 rounded-lg text-xs uppercase font-medium transition-colors min-h-[44px] ${
                    activeHomeSubtab === 'products' ? 'bg-[#7A1C30] text-white' : 'bg-[#FAF6EE] text-[#1F1F1F]'
                  }`}
                >
                  👗 3. New Arrivals
                </button>
                <button
                  onClick={() => setActiveHomeSubtab('whyGaurangi')}
                  className={`px-4 py-2 rounded-lg text-xs uppercase font-medium transition-colors min-h-[44px] ${
                    activeHomeSubtab === 'whyGaurangi' ? 'bg-[#7A1C30] text-white' : 'bg-[#FAF6EE] text-[#1F1F1F]'
                  }`}
                >
                  🛡️ 4. Why Gaurangi (Trust)
                </button>
                <button
                  onClick={() => setActiveHomeSubtab('stories')}
                  className={`px-4 py-2 rounded-lg text-xs uppercase font-medium transition-colors min-h-[44px] ${
                    activeHomeSubtab === 'stories' ? 'bg-[#7A1C30] text-white' : 'bg-[#FAF6EE] text-[#1F1F1F]'
                  }`}
                >
                  💬 5. Style Notes
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
                            placeholder="e.g. Applied, not printed."
                            className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none"
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

              {/* Subtab 2: Shop by Technique */}
              {activeHomeSubtab === 'categories' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between bg-[#FAF6EE] p-4 rounded-xl border border-[#EAE5D9]">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#7A1C30]">
                      Shop by Technique Visibility Control
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

                  {/* Craft Section + Artisans Section Visibility */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center justify-between bg-[#FAF6EE] p-4 rounded-xl border border-[#EAE5D9]">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#7A1C30]">The Craft Section</span>
                      <button
                        onClick={() => {
                          setFormData({
                            ...formData,
                            hiddenSections: {
                              ...formData.hiddenSections,
                              craftSection: !formData.hiddenSections?.craftSection,
                            },
                          });
                        }}
                        className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                          formData.hiddenSections?.craftSection
                            ? 'bg-red-50 text-red-600 border-red-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        {formData.hiddenSections?.craftSection ? '🔴 Hidden' : '🟢 Visible'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between bg-[#FAF6EE] p-4 rounded-xl border border-[#EAE5D9]">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#7A1C30]">Artisans Section</span>
                      <button
                        onClick={() => {
                          setFormData({
                            ...formData,
                            hiddenSections: {
                              ...formData.hiddenSections,
                              artisansSection: !formData.hiddenSections?.artisansSection,
                            },
                          });
                        }}
                        className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                          formData.hiddenSections?.artisansSection
                            ? 'bg-red-50 text-red-600 border-red-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        {formData.hiddenSections?.artisansSection ? '🔴 Hidden' : '🟢 Visible'}
                      </button>
                    </div>
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
                          placeholder="e.g. Shop by Technique"
                          className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none"
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
                          placeholder="e.g. Shop All Techniques →"
                          className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Link Destination URL</label>
                        <input
                          type="text"
                          value={formData.sectionHeaders?.categoriesLinkUrl || '/shop'}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              sectionHeaders: {
                                ...formData.sectionHeaders,
                                categoriesLinkUrl: e.target.value,
                              },
                            });
                          }}
                          placeholder="e.g. /shop"
                          className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {(formData.collections || []).map((col, idx) => (
                      <div key={col.id || idx} className="p-6 bg-[#FAF6EE] rounded-xl border border-[#EAE5D9] space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-serif-editorial text-base text-[#7A1C30]">Technique #{idx + 1}</h3>
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
                              placeholder="e.g. Floral Vine Appliqué"
                              className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none"
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
                              placeholder="e.g. Vines & blossoms traced by hand"
                              className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Small Tag Text (shown under title)</label>
                            <input
                              type="text"
                              value={col.tag || ''}
                              onChange={(e) => {
                                const updated = [...formData.collections];
                                updated[idx].tag = e.target.value;
                                setFormData({ ...formData, collections: updated });
                              }}
                              placeholder="e.g. Suit Sets"
                              className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-xs uppercase font-medium text-gray-600 block mb-1">
                              Technique Link ID (lowercase, hyphens)
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={col.id || ''}
                                onChange={(e) => {
                                  const updated = [...formData.collections];
                                  updated[idx].id = e.target.value;
                                  setFormData({ ...formData, collections: updated });
                                }}
                                placeholder="e.g. zardozi"
                                className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...formData.collections];
                                  updated[idx].id = slugify(updated[idx].title || '');
                                  setFormData({ ...formData, collections: updated });
                                }}
                                title="Generate the link ID from the title"
                                className="px-3 py-2 bg-[#0A2A54] text-white rounded-lg text-xs whitespace-nowrap"
                              >
                                ↻ from Title
                              </button>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-1">
                              Lowercase link ID used to match products to this technique (e.g. in the Shop filters).
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const newTechnique = {
                        id: `technique-${Date.now()}`,
                        title: 'New Technique',
                        subtitle: 'Subtitle for this technique',
                        image: DUMMY_IMAGE,
                        tag: 'Suit Sets',
                      };
                      setFormData({ ...formData, collections: [...(formData.collections || []), newTechnique] });
                    }}
                    className="bg-[#0A2A54] text-[#FFFBF3] hover:bg-[#C9962F] text-xs px-6 py-2.5 rounded-full flex items-center gap-2"
                  >
                    <Plus size={15} /> Add New Technique
                  </button>
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
                    Manage full product list under <strong>Shop / The Edit</strong>. Up to 8 products are featured on the homepage.
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
                      className="bg-[#0A2A54] text-[#FFFBF3] hover:bg-[#C9962F] text-xs px-6 py-2.5 rounded-full flex items-center gap-2"
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
                    Shop / The Edit (/shop) Editor
                  </h2>
                  <p className="text-xs text-gray-500 font-light mt-1">
                    Author the edit banner, category filters, technique chips, and the full product catalog.
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
                    placeholder="e.g. The Gaurangi Edit"
                    className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none"
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
                <div className="pb-2 border-b border-[#EAE5D9] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-serif-editorial text-xl text-[#7A1C30]">The Edit Product Manager</h3>
                    <p className="text-xs text-gray-500 font-light mt-0.5">Manage, reorder, or bulk import products for your store.</p>
                  </div>

                  {/* Bulk Authoring & Spreadsheet Tools */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleExportCSV}
                      className="px-3.5 py-1.5 rounded-lg border border-[#C5A059] text-[#7A1C30] hover:bg-[#C5A059]/10 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                      title="Export all products to CSV for editing in Excel / Google Sheets"
                    >
                      <Download size={14} /> Export CSV
                    </button>

                    <label className="px-3.5 py-1.5 rounded-lg bg-[#C5A059] text-white hover:bg-[#B38F48] text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm">
                      <Upload size={14} /> Bulk Import CSV
                      <input
                        type="file"
                        accept=".csv"
                        className="hidden"
                        onChange={handleImportCSV}
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {(formData.products || []).map((prod, idx) => (
                    <div
                      key={prod.id || idx}
                      draggable={true}
                      onDragStart={() => setDraggedIndex(idx)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (draggedIndex !== null && draggedIndex !== idx) {
                          moveProduct(draggedIndex, idx);
                          setDraggedIndex(null);
                        }
                      }}
                      className={`p-6 bg-[#FAF6EE] rounded-xl border ${draggedIndex === idx ? 'border-2 border-[#7A1C30] opacity-50' : 'border-[#EAE5D9]'} space-y-4 shadow-sm transition-all`}
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-[#EAE5D9]">
                        <div className="flex items-center gap-2">
                          <span className="cursor-grab text-gray-400 hover:text-[#7A1C30]" title="Drag to reorder">
                            <GripVertical size={18} />
                          </span>
                          <h4 className="font-serif-editorial text-base text-[#7A1C30]">Product #{idx + 1}: {prod.name}</h4>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Reorder Buttons */}
                          <div className="flex items-center gap-1 bg-white border border-[#EAE5D9] rounded-lg p-0.5">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveProduct(idx, idx - 1)}
                              className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center text-gray-600 hover:text-[#7A1C30] disabled:opacity-30 disabled:hover:text-gray-600"
                              title="Move Up"
                              aria-label="Move product up"
                            >
                              <ArrowUp size={16} />
                            </button>
                            <button
                              type="button"
                              disabled={idx === (formData.products || []).length - 1}
                              onClick={() => moveProduct(idx, idx + 1)}
                              className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center text-gray-600 hover:text-[#7A1C30] disabled:opacity-30 disabled:hover:text-gray-600"
                              title="Move Down"
                              aria-label="Move product down"
                            >
                              <ArrowDown size={16} />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              const updated = formData.products.filter((_, i) => i !== idx);
                              setFormData({ ...formData, products: updated });
                            }}
                            className="text-xs text-red-600 hover:underline flex items-center gap-1 font-sans ml-2"
                          >
                            <Trash2 size={13} /> Remove
                          </button>
                        </div>
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
                          <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Product Price</label>
                          <input
                            type="text"
                            value={prod.price || ''}
                            onChange={(e) => {
                              const updated = [...formData.products];
                              updated[idx].price = e.target.value;
                              setFormData({ ...formData, products: updated });
                            }}
                            placeholder="e.g. ₹ 14,500"
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
                            placeholder="e.g. Pure Handloom Silk"
                            className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Category Badge</label>
                          <input
                            type="text"
                            value={prod.category || ''}
                            onChange={(e) => {
                              const updated = [...formData.products];
                              updated[idx].category = e.target.value;
                              setFormData({ ...formData, products: updated });
                            }}
                            placeholder="e.g. Suit Sets"
                            className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Technique</label>
                          <select
                            value={prod.technique || ''}
                            onChange={(e) => {
                              const updated = [...formData.products];
                              updated[idx].technique = e.target.value;
                              setFormData({ ...formData, products: updated });
                            }}
                            className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none bg-white"
                          >
                            <option value="">None</option>
                            {techniqueOptions.map((t) => (
                              <option key={t.id} value={t.id}>{t.label}</option>
                            ))}
                          </select>
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
                  type="button"
                  onClick={() => {
                    const newItem: ProductItem = {
                      id: `prod-${Date.now()}`,
                      name: 'New Appliqué Suit Set',
                      fabric: 'Cotton',
                      price: '₹ 2,500',
                      image: DUMMY_IMAGE,
                      category: 'Suit Sets',
                      technique: 'floral-vine',
                    };
                    setFormData({ ...formData, products: [...(formData.products || []), newItem] });
                  }}
                  className="btn-maroon text-xs px-6 py-2.5 rounded-full flex items-center gap-2 shadow-md"
                >
                  <Plus size={15} /> Add New Product
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
                <div>
                  <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Specifications Box Section Title</label>
                  <input
                    type="text"
                    value={formData.productPageSettings?.specsSectionTitle || "What's Included in This Set"}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        productPageSettings: {
                          ...formData.productPageSettings,
                          specsSectionTitle: e.target.value,
                          defaultTopMetres: formData.productPageSettings?.defaultTopMetres || '',
                          defaultBottomMetres: formData.productPageSettings?.defaultBottomMetres || '',
                          defaultDupattaMetres: formData.productPageSettings?.defaultDupattaMetres || '',
                          defaultWashCare: formData.productPageSettings?.defaultWashCare || '',
                          shippingPolicyText: formData.productPageSettings?.shippingPolicyText || '',
                          returnPolicyText: formData.productPageSettings?.returnPolicyText || '',
                          whatsAppNumber: formData.productPageSettings?.whatsAppNumber || '',
                        },
                      });
                    }}
                    className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none font-serif-editorial text-base text-[#7A1C30]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Kurta / Top Fabric Default</label>
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
                    <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Salwar / Bottom Fabric Default</label>
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
                    <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Dupatta Fabric Default</label>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Express Shipping Policy Text</label>
                    <input
                      type="text"
                      value={formData.productPageSettings?.shippingPolicyText || 'Free Express Shipping across India'}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          productPageSettings: {
                            ...formData.productPageSettings,
                            shippingPolicyText: e.target.value,
                            defaultTopMetres: formData.productPageSettings?.defaultTopMetres || '',
                            defaultBottomMetres: formData.productPageSettings?.defaultBottomMetres || '',
                            defaultDupattaMetres: formData.productPageSettings?.defaultDupattaMetres || '',
                            defaultWashCare: formData.productPageSettings?.defaultWashCare || '',
                            returnPolicyText: formData.productPageSettings?.returnPolicyText || '',
                            whatsAppNumber: formData.productPageSettings?.whatsAppNumber || '',
                          },
                        });
                      }}
                      className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Easy Return Policy Text</label>
                    <input
                      type="text"
                      value={formData.productPageSettings?.returnPolicyText || '7-Day Easy Returns & Exchange'}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          productPageSettings: {
                            ...formData.productPageSettings,
                            returnPolicyText: e.target.value,
                            defaultTopMetres: formData.productPageSettings?.defaultTopMetres || '',
                            defaultBottomMetres: formData.productPageSettings?.defaultBottomMetres || '',
                            defaultDupattaMetres: formData.productPageSettings?.defaultDupattaMetres || '',
                            defaultWashCare: formData.productPageSettings?.defaultWashCare || '',
                            shippingPolicyText: formData.productPageSettings?.shippingPolicyText || '',
                            whatsAppNumber: formData.productPageSettings?.whatsAppNumber || '',
                          },
                        });
                      }}
                      className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                    />
                  </div>
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

              {/* Per-Product Detail Authoring Manager */}
              <div className="p-6 bg-[#FAF6EE] rounded-xl border border-[#EAE5D9] space-y-6">
                <div className="pb-3 border-b border-[#EAE5D9] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-serif-editorial text-xl text-[#7A1C30]">Author Specific Product Details</h3>
                    <p className="text-xs text-gray-500 font-light mt-0.5">
                      Edit individual fabric measurements, descriptions, price, and craft details for any specific dress material product.
                    </p>
                  </div>

                  {/* Bulk Authoring & Spreadsheet Tools */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleExportCSV}
                      className="px-3.5 py-1.5 rounded-lg border border-[#C5A059] text-[#7A1C30] hover:bg-[#C5A059]/10 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                      title="Export all products to CSV for editing in Excel / Google Sheets"
                    >
                      <Download size={14} /> Export CSV
                    </button>

                    <label className="px-3.5 py-1.5 rounded-lg bg-[#C5A059] text-white hover:bg-[#B38F48] text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm">
                      <Upload size={14} /> Bulk Import CSV
                      <input
                        type="file"
                        accept=".csv"
                        className="hidden"
                        onChange={handleImportCSV}
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {(formData.products || []).map((prod, idx) => (
                    <div
                      key={prod.id || idx}
                      draggable={true}
                      onDragStart={() => setDraggedIndex(idx)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (draggedIndex !== null && draggedIndex !== idx) {
                          moveProduct(draggedIndex, idx);
                          setDraggedIndex(null);
                        }
                      }}
                      className={`p-5 bg-white rounded-xl border ${draggedIndex === idx ? 'border-2 border-[#7A1C30] opacity-50' : 'border-[#EAE5D9]'} space-y-4 shadow-sm transition-all`}
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-[#EAE5D9]">
                        <div className="flex items-center gap-2">
                          <span className="cursor-grab text-gray-400 hover:text-[#7A1C30]" title="Drag to reorder">
                            <GripVertical size={18} />
                          </span>
                          <h4 className="font-serif-editorial text-base text-[#7A1C30] font-medium">
                            Product #{idx + 1}: {prod.name}
                          </h4>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Reorder Buttons */}
                          <div className="flex items-center gap-1 bg-[#FAF6EE] border border-[#EAE5D9] rounded-lg p-0.5">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveProduct(idx, idx - 1)}
                              className="p-1 text-gray-600 hover:text-[#7A1C30] disabled:opacity-30 disabled:hover:text-gray-600"
                              title="Move Up"
                            >
                              <ArrowUp size={13} />
                            </button>
                            <button
                              type="button"
                              disabled={idx === (formData.products || []).length - 1}
                              onClick={() => moveProduct(idx, idx + 1)}
                              className="p-1 text-gray-600 hover:text-[#7A1C30] disabled:opacity-30 disabled:hover:text-gray-600"
                              title="Move Down"
                            >
                              <ArrowDown size={13} />
                            </button>
                          </div>

                          <span className="text-xs font-sans text-[#C5A059] font-bold">{prod.price}</span>

                          <button
                            type="button"
                            onClick={() => {
                              const updated = formData.products.filter((_, i) => i !== idx);
                              setFormData({ ...formData, products: updated });
                            }}
                            className="text-xs text-red-600 hover:underline flex items-center gap-1 font-sans ml-2"
                          >
                            <Trash2 size={13} /> Remove
                          </button>
                        </div>
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
                            className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Product Price</label>
                          <input
                            type="text"
                            value={prod.price || ''}
                            onChange={(e) => {
                              const updated = [...formData.products];
                              updated[idx].price = e.target.value;
                              setFormData({ ...formData, products: updated });
                            }}
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
                            placeholder="e.g. Pure Handloom Silk"
                            className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Category Badge</label>
                          <input
                            type="text"
                            value={prod.category || ''}
                            onChange={(e) => {
                              const updated = [...formData.products];
                              updated[idx].category = e.target.value;
                              setFormData({ ...formData, products: updated });
                            }}
                            placeholder="e.g. Festive Wear"
                            className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Authenticity Badge</label>
                          <input
                            type="text"
                            value={prod.badge || ''}
                            onChange={(e) => {
                              const updated = [...formData.products];
                              updated[idx].badge = e.target.value;
                              setFormData({ ...formData, products: updated });
                            }}
                            placeholder="e.g. 100% Authentic Handloom"
                            className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Top Metres</label>
                          <input
                            type="text"
                            value={prod.topMetres || ''}
                            onChange={(e) => {
                              const updated = [...formData.products];
                              updated[idx].topMetres = e.target.value;
                              setFormData({ ...formData, products: updated });
                            }}
                            placeholder="e.g. 2.5 Metres"
                            className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Bottom Fabric</label>
                          <input
                            type="text"
                            value={prod.bottomFabric || ''}
                            onChange={(e) => {
                              const updated = [...formData.products];
                              updated[idx].bottomFabric = e.target.value;
                              setFormData({ ...formData, products: updated });
                            }}
                            placeholder="e.g. Matching Silk Satin Blend"
                            className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Bottom Metres</label>
                          <input
                            type="text"
                            value={prod.bottomMetres || ''}
                            onChange={(e) => {
                              const updated = [...formData.products];
                              updated[idx].bottomMetres = e.target.value;
                              setFormData({ ...formData, products: updated });
                            }}
                            placeholder="e.g. 2.5 Metres"
                            className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Dupatta Fabric</label>
                          <input
                            type="text"
                            value={prod.dupattaFabric || ''}
                            onChange={(e) => {
                              const updated = [...formData.products];
                              updated[idx].dupattaFabric = e.target.value;
                              setFormData({ ...formData, products: updated });
                            }}
                            placeholder="e.g. Woven Zari Border Drape"
                            className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Dupatta Metres</label>
                          <input
                            type="text"
                            value={prod.dupattaMetres || ''}
                            onChange={(e) => {
                              const updated = [...formData.products];
                              updated[idx].dupattaMetres = e.target.value;
                              setFormData({ ...formData, products: updated });
                            }}
                            placeholder="e.g. 2.25 Metres"
                            className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Craft & Embroidery</label>
                          <input
                            type="text"
                            value={prod.craft || ''}
                            onChange={(e) => {
                              const updated = [...formData.products];
                              updated[idx].craft = e.target.value;
                              setFormData({ ...formData, products: updated });
                            }}
                            placeholder="e.g. Zari Hand Embroidery"
                            className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Wash Care</label>
                          <input
                            type="text"
                            value={prod.washCare || ''}
                            onChange={(e) => {
                              const updated = [...formData.products];
                              updated[idx].washCare = e.target.value;
                              setFormData({ ...formData, products: updated });
                            }}
                            placeholder="e.g. Dry Clean Only"
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

                      <div>
                        <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Product Description / Story</label>
                        <textarea
                          value={prod.description || ''}
                          onChange={(e) => {
                            const updated = [...formData.products];
                            updated[idx].description = e.target.value;
                            setFormData({ ...formData, products: updated });
                          }}
                          rows={2}
                          placeholder="Describe the weave heritage and details of this product..."
                          className="w-full px-3 py-2 text-xs border border-[#EAE5D9] rounded-lg outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const newItem: ProductItem = {
                      id: `prod-${Date.now()}`,
                      name: 'New Appliqué Suit Set',
                      fabric: 'Cotton',
                      price: '₹ 2,500',
                      image: DUMMY_IMAGE,
                      category: 'Suit Sets',
                      technique: 'floral-vine',
                    };
                    setFormData({ ...formData, products: [...(formData.products || []), newItem] });
                  }}
                  className="bg-[#0A2A54] text-[#FFFBF3] hover:bg-[#C9962F] text-xs px-6 py-2.5 rounded-full flex items-center gap-2 shadow-md"
                >
                  <Plus size={15} /> Add New Product
                </button>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* PAGE 4: THE CRAFT                          */}
          {/* ========================================== */}
          {activePageTab === 'aboutPage' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE5D9]">
                <div>
                  <h2 className="font-serif-editorial text-2xl text-[#7A1C30] font-medium">
                    The Craft (/craft) Editor
                  </h2>
                  <p className="text-xs text-gray-500 font-light mt-1">
                    Author the Pipili appliqué story, how-it&rsquo;s-made steps, workshops, and the artisan spotlight.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-[#FAF6EE] rounded-xl border border-[#EAE5D9] space-y-4">
                <h3 className="font-serif-editorial text-base text-[#7A1C30]">Craft Hero</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Hero Badge</label>
                    <input
                      type="text"
                      value={formData.craftPageContent?.heroBadge || ''}
                      onChange={(e) => {
                        const next = { ...formData.craftPageContent, heroBadge: e.target.value } as CraftPageContent;
                        setFormData({ ...formData, craftPageContent: next });
                      }}
                      placeholder="e.g. The Craft"
                      className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Hero Title</label>
                    <input
                      type="text"
                      value={formData.craftPageContent?.heroTitle || ''}
                      onChange={(e) => {
                        const next = { ...formData.craftPageContent, heroTitle: e.target.value } as CraftPageContent;
                        setFormData({ ...formData, craftPageContent: next });
                      }}
                      placeholder="e.g. Applied, not printed. Layered, not flat."
                      className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Hero Subtitle</label>
                  <textarea
                    value={formData.craftPageContent?.heroSubtitle || ''}
                    rows={3}
                    onChange={(e) => {
                      const next = { ...formData.craftPageContent, heroSubtitle: e.target.value } as CraftPageContent;
                      setFormData({ ...formData, craftPageContent: next });
                    }}
                    placeholder="Explains how appliqué differs from embroidery..."
                    className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none"
                  />
                </div>
              </div>

              <div className="p-6 bg-[#FAF6EE] rounded-xl border border-[#EAE5D9] space-y-4">
                <h3 className="font-serif-editorial text-base text-[#7A1C30]">What Is Pipili Appliqué?</h3>
                <div>
                  <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.craftPageContent?.whatIsTitle || ''}
                    onChange={(e) => {
                      const next = { ...formData.craftPageContent, whatIsTitle: e.target.value } as CraftPageContent;
                      setFormData({ ...formData, craftPageContent: next });
                    }}
                    className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Body</label>
                  <textarea
                    value={formData.craftPageContent?.whatIsBody || ''}
                    rows={4}
                    onChange={(e) => {
                      const next = { ...formData.craftPageContent, whatIsBody: e.target.value } as CraftPageContent;
                      setFormData({ ...formData, craftPageContent: next });
                    }}
                    className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none"
                  />
                </div>
              </div>

              <div className="p-6 bg-[#FAF6EE] rounded-xl border border-[#EAE5D9] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif-editorial text-base text-[#7A1C30]">How It&rsquo;s Made — Steps</h3>
                  <button
                    type="button"
                    onClick={() => {
                      const steps = [...(formData.craftPageContent?.steps || [])];
                      steps.push({ number: String(steps.length + 1).padStart(2, '0'), title: 'New step', description: '' });
                      const next = { ...formData.craftPageContent, steps } as CraftPageContent;
                      setFormData({ ...formData, craftPageContent: next });
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#C5A059] text-white hover:bg-[#B38F48] text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Plus size={14} /> Add Step
                  </button>
                </div>

                {(formData.craftPageContent?.steps || []).map((step, idx) => (
                  <div key={idx} className="border border-[#EAE5D9] rounded-lg bg-white p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="mono text-[#C5A059] text-xs">Step {step.number || idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const steps = (formData.craftPageContent?.steps || []).filter((_, i) => i !== idx);
                          const next = { ...formData.craftPageContent, steps } as CraftPageContent;
                          setFormData({ ...formData, craftPageContent: next });
                        }}
                        className="text-xs text-red-600 hover:underline flex items-center gap-1"
                      >
                        <Trash2 size={13} /> Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={step.number}
                        onChange={(e) => {
                          const steps = [...(formData.craftPageContent?.steps || [])];
                          steps[idx] = { ...steps[idx], number: e.target.value };
                          const next = { ...formData.craftPageContent, steps } as CraftPageContent;
                          setFormData({ ...formData, craftPageContent: next });
                        }}
                        placeholder="Number (e.g. 01)"
                        className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none"
                      />
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => {
                          const steps = [...(formData.craftPageContent?.steps || [])];
                          steps[idx] = { ...steps[idx], title: e.target.value };
                          const next = { ...formData.craftPageContent, steps } as CraftPageContent;
                          setFormData({ ...formData, craftPageContent: next });
                        }}
                        placeholder="Step title"
                        className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none"
                      />
                    </div>
                    <textarea
                      value={step.description}
                      rows={2}
                      onChange={(e) => {
                        const steps = [...(formData.craftPageContent?.steps || [])];
                        steps[idx] = { ...steps[idx], description: e.target.value };
                        const next = { ...formData.craftPageContent, steps } as CraftPageContent;
                        setFormData({ ...formData, craftPageContent: next });
                      }}
                      placeholder="Step description"
                      className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none"
                    />
                  </div>
                ))}
              </div>

              <div className="p-6 bg-[#FAF6EE] rounded-xl border border-[#EAE5D9] space-y-4">
                <h3 className="font-serif-editorial text-base text-[#7A1C30]">Workshops &amp; Artisans</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Workshops Title</label>
                    <input
                      type="text"
                      value={formData.craftPageContent?.workshopsTitle || ''}
                      onChange={(e) => {
                        const next = { ...formData.craftPageContent, workshopsTitle: e.target.value } as CraftPageContent;
                        setFormData({ ...formData, craftPageContent: next });
                      }}
                      className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Workshops Link Text</label>
                    <input
                      type="text"
                      value={formData.craftPageContent?.workshopsLinkText || ''}
                      onChange={(e) => {
                        const next = { ...formData.craftPageContent, workshopsLinkText: e.target.value } as CraftPageContent;
                        setFormData({ ...formData, craftPageContent: next });
                      }}
                      className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Workshops Body</label>
                  <textarea
                    value={formData.craftPageContent?.workshopsBody || ''}
                    rows={3}
                    onChange={(e) => {
                      const next = { ...formData.craftPageContent, workshopsBody: e.target.value } as CraftPageContent;
                      setFormData({ ...formData, craftPageContent: next });
                    }}
                    className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Artisans Title</label>
                  <input
                    type="text"
                    value={formData.craftPageContent?.artisansTitle || ''}
                    onChange={(e) => {
                      const next = { ...formData.craftPageContent, artisansTitle: e.target.value } as CraftPageContent;
                      setFormData({ ...formData, craftPageContent: next });
                    }}
                    className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Artisans Body</label>
                  <textarea
                    value={formData.craftPageContent?.artisansBody || ''}
                    rows={3}
                    onChange={(e) => {
                      const next = { ...formData.craftPageContent, artisansBody: e.target.value } as CraftPageContent;
                      setFormData({ ...formData, craftPageContent: next });
                    }}
                    className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Why Hand-Cut Title</label>
                    <input
                      type="text"
                      value={formData.craftPageContent?.handCutTitle || ''}
                      onChange={(e) => {
                        const next = { ...formData.craftPageContent, handCutTitle: e.target.value } as CraftPageContent;
                        setFormData({ ...formData, craftPageContent: next });
                      }}
                      className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase font-medium text-gray-600 block mb-1">CTA Link Text</label>
                    <input
                      type="text"
                      value={formData.craftPageContent?.ctaLinkText || ''}
                      onChange={(e) => {
                        const next = { ...formData.craftPageContent, ctaLinkText: e.target.value } as CraftPageContent;
                        setFormData({ ...formData, craftPageContent: next });
                      }}
                      className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase font-medium text-gray-600 block mb-1">Why Hand-Cut Body</label>
                  <textarea
                    value={formData.craftPageContent?.handCutBody || ''}
                    rows={3}
                    onChange={(e) => {
                      const next = { ...formData.craftPageContent, handCutBody: e.target.value } as CraftPageContent;
                      setFormData({ ...formData, craftPageContent: next });
                    }}
                    className="w-full px-3 py-2 text-base md:text-xs border border-[#EAE5D9] rounded-lg outline-none"
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
                    Contact & Footer Editor
                  </h2>
                  <p className="text-xs text-gray-500 font-light mt-1">
                    Author contact details shown in the footer across all pages.
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
