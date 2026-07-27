'use client';

import React, { useState } from 'react';
import { useContent, HomepageData, HeroSlide, CollectionItem, ProductItem, OccasionItem, CustomerStoryItem } from '@/context/ContentContext';
import { Sparkles, Save, Upload, Plus, Trash2, CheckCircle, Image as ImageIcon, Home, Layers, ShoppingBag, Calendar, Quote, PhoneCall } from 'lucide-react';
import Link from 'next/link';
import { DUMMY_IMAGE } from '@/lib/constants';

export default function AdminDashboard() {
  const { data, saveData, uploadImage } = useContent();
  const [formData, setFormData] = useState<HomepageData>(data);
  const [activeTab, setActiveTab] = useState<'hero' | 'collections' | 'products' | 'occasions' | 'stories' | 'contact'>('hero');
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
            Content Sections
          </span>

          <button
            onClick={() => setActiveTab('hero')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-colors ${
              activeTab === 'hero' ? 'bg-[#7A1C30] text-white' : 'hover:bg-[#FAF6EE] text-[#1F1F1F]'
            }`}
          >
            <Layers size={16} /> Hero Banner Slider
          </button>

          <button
            onClick={() => setActiveTab('collections')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-colors ${
              activeTab === 'collections' ? 'bg-[#7A1C30] text-white' : 'hover:bg-[#FAF6EE] text-[#1F1F1F]'
            }`}
          >
            <Layers size={16} /> Curated Collections
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-colors ${
              activeTab === 'products' ? 'bg-[#7A1C30] text-white' : 'hover:bg-[#FAF6EE] text-[#1F1F1F]'
            }`}
          >
            <ShoppingBag size={16} /> New Arrivals & Products
          </button>

          <button
            onClick={() => setActiveTab('occasions')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-colors ${
              activeTab === 'occasions' ? 'bg-[#7A1C30] text-white' : 'hover:bg-[#FAF6EE] text-[#1F1F1F]'
            }`}
          >
            <Calendar size={16} /> Shop By Occasion
          </button>

          <button
            onClick={() => setActiveTab('stories')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-colors ${
              activeTab === 'stories' ? 'bg-[#7A1C30] text-white' : 'hover:bg-[#FAF6EE] text-[#1F1F1F]'
            }`}
          >
            <Quote size={16} /> Customer Stories
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-3 transition-colors ${
              activeTab === 'contact' ? 'bg-[#7A1C30] text-white' : 'hover:bg-[#FAF6EE] text-[#1F1F1F]'
            }`}
          >
            <PhoneCall size={16} /> Boutique Contact Info
          </button>
        </aside>

        {/* Tab Content Editor Form Area */}
        <main className="lg:col-span-9 bg-white p-8 rounded-2xl border border-[#EAE5D9] shadow-sm">
          
          {/* TAB 1: HERO SLIDER EDITOR */}
          {activeTab === 'hero' && (
            <div className="space-y-8">
              <div>
                <h2 className="font-serif-editorial text-2xl text-[#7A1C30] font-medium">Hero Banner Slider</h2>
                <p className="text-xs text-gray-500 font-light">Edit the 3 rotating slides featured at the top of your homepage.</p>
              </div>

              {formData.heroSlides.map((slide, idx) => (
                <div key={slide.id} className="p-6 bg-[#FAF6EE] rounded-xl border border-[#EAE5D9] space-y-4">
                  <span className="text-xs font-bold text-[#C5A059] uppercase tracking-wider">Slide 0{idx + 1}</span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Badge Tag</label>
                      <input
                        type="text"
                        value={slide.badge}
                        onChange={(e) => {
                          const updated = [...formData.heroSlides];
                          updated[idx].badge = e.target.value;
                          setFormData({ ...formData, heroSlides: updated });
                        }}
                        className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-gray-300 outline-none focus:border-[#7A1C30]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Title (Main Word)</label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => {
                          const updated = [...formData.heroSlides];
                          updated[idx].title = e.target.value;
                          setFormData({ ...formData, heroSlides: updated });
                        }}
                        className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-gray-300 outline-none focus:border-[#7A1C30]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Title (Italic Gold Word)</label>
                      <input
                        type="text"
                        value={slide.italicTitle}
                        onChange={(e) => {
                          const updated = [...formData.heroSlides];
                          updated[idx].italicTitle = e.target.value;
                          setFormData({ ...formData, heroSlides: updated });
                        }}
                        className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-gray-300 outline-none focus:border-[#7A1C30]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Weave / Fabric Tag</label>
                      <input
                        type="text"
                        value={slide.weave}
                        onChange={(e) => {
                          const updated = [...formData.heroSlides];
                          updated[idx].weave = e.target.value;
                          setFormData({ ...formData, heroSlides: updated });
                        }}
                        className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-gray-300 outline-none focus:border-[#7A1C30]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Tagline / Description</label>
                    <textarea
                      rows={2}
                      value={slide.tagline}
                      onChange={(e) => {
                        const updated = [...formData.heroSlides];
                        updated[idx].tagline = e.target.value;
                        setFormData({ ...formData, heroSlides: updated });
                      }}
                      className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-gray-300 outline-none focus:border-[#7A1C30]"
                    />
                  </div>

                  {/* Image Upload for Slide */}
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Slide Photo</label>
                    <div className="flex items-center gap-4">
                      <img src={slide.image} alt="Preview" className="w-16 h-20 object-cover rounded-lg border border-gray-300" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileChange(e, (url) => {
                          const updated = [...formData.heroSlides];
                          updated[idx].image = url;
                          setFormData({ ...formData, heroSlides: updated });
                        })}
                        className="text-xs text-gray-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: CURATED COLLECTIONS */}
          {activeTab === 'collections' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif-editorial text-2xl text-[#7A1C30] font-medium">Curated Collections</h2>
                <p className="text-xs text-gray-500 font-light">Manage the 4 primary editorial collection cards.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formData.collections.map((col, idx) => (
                  <div key={col.id} className="p-5 bg-[#FAF6EE] rounded-xl border border-[#EAE5D9] space-y-3">
                    <span className="text-xs font-bold text-[#C5A059] uppercase">Collection 0{idx + 1}</span>
                    
                    <div>
                      <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Title</label>
                      <input
                        type="text"
                        value={col.title}
                        onChange={(e) => {
                          const updated = [...formData.collections];
                          updated[idx].title = e.target.value;
                          setFormData({ ...formData, collections: updated });
                        }}
                        className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-gray-300"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={col.subtitle}
                        onChange={(e) => {
                          const updated = [...formData.collections];
                          updated[idx].subtitle = e.target.value;
                          setFormData({ ...formData, collections: updated });
                        }}
                        className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-gray-300"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Tag Badge</label>
                      <input
                        type="text"
                        value={col.tag}
                        onChange={(e) => {
                          const updated = [...formData.collections];
                          updated[idx].tag = e.target.value;
                          setFormData({ ...formData, collections: updated });
                        }}
                        className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-gray-300"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Collection Photo</label>
                      <div className="flex items-center gap-3">
                        <img src={col.image} alt="Preview" className="w-12 h-16 object-cover rounded-lg border" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileChange(e, (url) => {
                            const updated = [...formData.collections];
                            updated[idx].image = url;
                            setFormData({ ...formData, collections: updated });
                          })}
                          className="text-xs text-gray-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTS & NEW ARRIVALS */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif-editorial text-2xl text-[#7A1C30] font-medium">Products & New Arrivals</h2>
                  <p className="text-xs text-gray-500 font-light">Add or edit saree & dress items featured on the homepage carousel.</p>
                </div>
                <button
                  onClick={() => {
                    const newItem: ProductItem = {
                      id: `product-${Date.now()}`,
                      name: 'New Saree Ensemble',
                      fabric: 'Pure Silk',
                      price: '₹ 15,000',
                      image: DUMMY_IMAGE,
                      category: 'New Arrival',
                    };
                    setFormData({ ...formData, products: [...formData.products, newItem] });
                  }}
                  className="px-4 py-2 rounded-full bg-[#7A1C30] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-md"
                >
                  <Plus size={14} /> Add Product
                </button>
              </div>

              <div className="space-y-4">
                {formData.products.map((prod, idx) => (
                  <div key={prod.id} className="p-5 bg-[#FAF6EE] rounded-xl border border-[#EAE5D9] flex flex-col md:flex-row items-center gap-6 justify-between">
                    <img src={prod.image} alt="Product" className="w-16 h-20 object-cover rounded-lg border border-gray-300 flex-shrink-0" />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                      <div>
                        <label className="block text-[0.65rem] uppercase font-bold text-gray-500">Product Name</label>
                        <input
                          type="text"
                          value={prod.name}
                          onChange={(e) => {
                            const updated = [...formData.products];
                            updated[idx].name = e.target.value;
                            setFormData({ ...formData, products: updated });
                          }}
                          className="w-full px-3 py-1.5 text-xs bg-white rounded-md border"
                        />
                      </div>
                      <div>
                        <label className="block text-[0.65rem] uppercase font-bold text-gray-500">Fabric</label>
                        <input
                          type="text"
                          value={prod.fabric}
                          onChange={(e) => {
                            const updated = [...formData.products];
                            updated[idx].fabric = e.target.value;
                            setFormData({ ...formData, products: updated });
                          }}
                          className="w-full px-3 py-1.5 text-xs bg-white rounded-md border"
                        />
                      </div>
                      <div>
                        <label className="block text-[0.65rem] uppercase font-bold text-gray-500">Price</label>
                        <input
                          type="text"
                          value={prod.price}
                          onChange={(e) => {
                            const updated = [...formData.products];
                            updated[idx].price = e.target.value;
                            setFormData({ ...formData, products: updated });
                          }}
                          className="w-full px-3 py-1.5 text-xs bg-white rounded-md border"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileChange(e, (url) => {
                          const updated = [...formData.products];
                          updated[idx].image = url;
                          setFormData({ ...formData, products: updated });
                        })}
                        className="text-xs text-gray-500 w-32"
                      />
                      <button
                        onClick={() => {
                          const updated = formData.products.filter((_, i) => i !== idx);
                          setFormData({ ...formData, products: updated });
                        }}
                        className="text-red-500 hover:text-red-700 p-2"
                        title="Delete product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SHOP BY OCCASION */}
          {activeTab === 'occasions' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif-editorial text-2xl text-[#7A1C30] font-medium">Shop By Occasion</h2>
                <p className="text-xs text-gray-500 font-light">Edit occasion tiles and photo drapes.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formData.occasions.map((occ, idx) => (
                  <div key={occ.id} className="p-5 bg-[#FAF6EE] rounded-xl border border-[#EAE5D9] space-y-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Occasion Title</label>
                      <input
                        type="text"
                        value={occ.title}
                        onChange={(e) => {
                          const updated = [...formData.occasions];
                          updated[idx].title = e.target.value;
                          setFormData({ ...formData, occasions: updated });
                        }}
                        className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={occ.subtitle}
                        onChange={(e) => {
                          const updated = [...formData.occasions];
                          updated[idx].subtitle = e.target.value;
                          setFormData({ ...formData, occasions: updated });
                        }}
                        className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Occasion Photo</label>
                      <div className="flex items-center gap-3">
                        <img src={occ.image} alt="Occasion" className="w-12 h-16 object-cover rounded-lg border" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileChange(e, (url) => {
                            const updated = [...formData.occasions];
                            updated[idx].image = url;
                            setFormData({ ...formData, occasions: updated });
                          })}
                          className="text-xs text-gray-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CUSTOMER STORIES */}
          {activeTab === 'stories' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif-editorial text-2xl text-[#7A1C30] font-medium">Customer Stories & Testimonials</h2>
                <p className="text-xs text-gray-500 font-light">Edit client reviews, names, cities, and occasion quotes.</p>
              </div>

              {formData.customerStories.map((story, idx) => (
                <div key={story.id} className="p-5 bg-[#FAF6EE] rounded-xl border border-[#EAE5D9] space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Client Name</label>
                      <input
                        type="text"
                        value={story.name}
                        onChange={(e) => {
                          const updated = [...formData.customerStories];
                          updated[idx].name = e.target.value;
                          setFormData({ ...formData, customerStories: updated });
                        }}
                        className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">City / Location</label>
                      <input
                        type="text"
                        value={story.location}
                        onChange={(e) => {
                          const updated = [...formData.customerStories];
                          updated[idx].location = e.target.value;
                          setFormData({ ...formData, customerStories: updated });
                        }}
                        className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Occasion</label>
                      <input
                        type="text"
                        value={story.occasion}
                        onChange={(e) => {
                          const updated = [...formData.customerStories];
                          updated[idx].occasion = e.target.value;
                          setFormData({ ...formData, customerStories: updated });
                        }}
                        className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-gray-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Quote</label>
                    <textarea
                      rows={2}
                      value={story.quote}
                      onChange={(e) => {
                        const updated = [...formData.customerStories];
                        updated[idx].quote = e.target.value;
                        setFormData({ ...formData, customerStories: updated });
                      }}
                      className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-gray-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 6: CONTACT INFO */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif-editorial text-2xl text-[#7A1C30] font-medium">Boutique Contact Info & Footer</h2>
                <p className="text-xs text-gray-500 font-light">Update your store address, phone, email, and social media handles.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Store Name</label>
                  <input
                    type="text"
                    value={formData.contactInfo.storeName}
                    onChange={(e) => setFormData({ ...formData, contactInfo: { ...formData.contactInfo, storeName: e.target.value } })}
                    className="w-full px-3 py-2 text-sm bg-[#FAF6EE] rounded-lg border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Flagship Address</label>
                  <input
                    type="text"
                    value={formData.contactInfo.address}
                    onChange={(e) => setFormData({ ...formData, contactInfo: { ...formData.contactInfo, address: e.target.value } })}
                    className="w-full px-3 py-2 text-sm bg-[#FAF6EE] rounded-lg border border-gray-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={formData.contactInfo.phone}
                      onChange={(e) => setFormData({ ...formData, contactInfo: { ...formData.contactInfo, phone: e.target.value } })}
                      className="w-full px-3 py-2 text-sm bg-[#FAF6EE] rounded-lg border border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Email Address</label>
                    <input
                      type="text"
                      value={formData.contactInfo.email}
                      onChange={(e) => setFormData({ ...formData, contactInfo: { ...formData.contactInfo, email: e.target.value } })}
                      className="w-full px-3 py-2 text-sm bg-[#FAF6EE] rounded-lg border border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
