import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart, ShoppingBag, Truck, RefreshCw, ShieldCheck, CheckCircle2, Star, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DEFAULT_HOMEPAGE_DATA } from '@/context/ContentContext';
import { getImageUrl } from '@/lib/constants';

// Required for Next.js static export on GitHub Pages
export function generateStaticParams() {
  const productIds = ['prod-1', 'prod-2', 'prod-3', 'prod-4', 'prod-5', 'prod-6', '1', '2', '3', '4'];
  return productIds.map((id) => ({ id }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const products = DEFAULT_HOMEPAGE_DATA?.products || [];
  const product = products.find((p) => p.id === id) || products[0] || {
    id: 'prod-1',
    name: 'Kanjivaram Zari Silk Dress Material',
    price: '₹4,850',
    fabric: 'Pure Silk',
    category: 'Heritage Silk',
    image: '/images/model-dummy.jpg',
  };

  const similarProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1F1F1F] flex flex-col font-sans">
      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="bg-[#F3EFEA] border-b border-[#EAE5D9] py-3 px-6 md:px-12 text-xs text-gray-600">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-[#7A1C30]">Home</Link>
          <span>/</span>
          <Link href="/dress-materials" className="hover:text-[#7A1C30]">Dress Materials</Link>
          <span>/</span>
          <span className="text-[#7A1C30] font-medium truncate">{product.name}</span>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <main className="py-12 px-6 md:px-12 max-w-7xl mx-auto w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Product Photo Display */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-gray-100 border border-[#EAE5D9] shadow-lg group">
              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[0.68rem] tracking-widest uppercase font-semibold text-[#7A1C30] border border-[#C5A059]/30">
                100% Authentic Handloom
              </span>
            </div>
          </div>

          {/* Right Column: Product Meta, Price, Fabric Specs & CTAs */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3 pb-6 border-b border-[#EAE5D9]">
              <span className="text-[0.72rem] tracking-[0.3em] uppercase text-[#C5A059] font-semibold block">
                {product.category || 'Boutique Dress Material'}
              </span>
              <h1 className="font-serif-editorial text-3xl md:text-4xl text-[#7A1C30] font-normal leading-tight">
                {product.name}
              </h1>

              {/* Price & Rating */}
              <div className="flex items-center gap-4 pt-2">
                <span className="font-serif-editorial text-3xl font-semibold text-[#7A1C30]">
                  {product.price}
                </span>
                <span className="text-xs text-gray-500 font-light">(Inclusive of all taxes)</span>
                <div className="ml-auto flex items-center gap-1 text-xs text-[#C5A059] font-medium">
                  <Star size={14} className="fill-[#C5A059]" /> 4.9 (28 Boutique Reviews)
                </div>
              </div>
            </div>

            {/* What's Included / Fabric Breakdown Specifications Box */}
            <div className="bg-[#F3EFEA] p-6 rounded-2xl border border-[#EAE5D9] space-y-4">
              <h3 className="font-serif-editorial text-lg text-[#7A1C30] font-medium flex items-center gap-2">
                <Sparkles size={16} className="text-[#C5A059]" /> What's Included in This Set
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div className="bg-white p-3.5 rounded-xl border border-[#EAE5D9]">
                  <span className="text-gray-500 block text-[0.68rem] uppercase tracking-wider mb-0.5">Top (Kurta Fabric)</span>
                  <strong className="text-[#7A1C30] font-semibold text-sm">2.5 Metres</strong>
                  <p className="text-gray-600 font-light text-[0.75rem]">{product.fabric || 'Pure Handloom Silk'}</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#EAE5D9]">
                  <span className="text-gray-500 block text-[0.68rem] uppercase tracking-wider mb-0.5">Bottom (Salwar / Pants)</span>
                  <strong className="text-[#7A1C30] font-semibold text-sm">2.5 Metres</strong>
                  <p className="text-gray-600 font-light text-[0.75rem]">Matching Silk Satin Blend</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#EAE5D9]">
                  <span className="text-gray-500 block text-[0.68rem] uppercase tracking-wider mb-0.5">Dupatta (Drape)</span>
                  <strong className="text-[#7A1C30] font-semibold text-sm">2.25 Metres</strong>
                  <p className="text-gray-600 font-light text-[0.75rem]">Woven Zari Border Drape</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#EAE5D9]">
                  <span className="text-gray-500 block text-[0.68rem] uppercase tracking-wider mb-0.5">Craft & Care</span>
                  <strong className="text-[#7A1C30] font-semibold text-sm">Zari Hand Embroidery</strong>
                  <p className="text-gray-600 font-light text-[0.75rem]">Dry Clean Only</p>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <button className="flex-1 btn-maroon justify-center py-4 text-sm font-semibold tracking-wider shadow-lg">
                  <ShoppingBag size={18} /> Add to Wardrobe Bag
                </button>
                <button className="w-14 h-14 rounded-full border border-[#C5A059] flex items-center justify-center text-[#7A1C30] hover:bg-[#7A1C30] hover:text-white transition-colors" title="Wishlist">
                  <Heart size={20} />
                </button>
              </div>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Hi Gaurangi Fashions! I want to inquire about ${product.name} (${product.price})`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-full border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <span>Order via WhatsApp Direct Inquiry</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#EAE5D9] text-center text-xs text-gray-600">
              <div className="flex flex-col items-center gap-1.5">
                <Truck size={20} className="text-[#C5A059]" />
                <span>Free Express Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <ShieldCheck size={20} className="text-[#C5A059]" />
                <span>100% Quality Guaranteed</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <RefreshCw size={20} className="text-[#C5A059]" />
                <span>Easy 7-Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Dress Materials Section */}
        {similarProducts.length > 0 && (
          <section className="mt-24 pt-16 border-t border-[#EAE5D9]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[0.72rem] tracking-[0.3em] uppercase text-[#C5A059] font-semibold block mb-1">
                  Complete Your Wardrobe
                </span>
                <h2 className="font-serif-editorial text-2xl md:text-3xl text-[#7A1C30] font-normal">
                  Similar Dress Materials
                </h2>
              </div>
              <Link href="/dress-materials" className="text-xs uppercase tracking-widest text-[#7A1C30] hover:underline font-semibold">
                View All Catalog →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  className="group bg-[#FAF6EE] rounded-xl overflow-hidden border border-[#EAE5D9] transition-all hover:shadow-md flex flex-col justify-between"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <h3 className="font-serif-editorial text-base text-[#1F1F1F] font-medium line-clamp-1 group-hover:text-[#7A1C30]">
                      {item.name}
                    </h3>
                    <div className="mt-3 pt-2 border-t border-[#EAE5D9] flex items-center justify-between">
                      <span className="font-serif-editorial text-sm font-semibold text-[#7A1C30]">
                        {item.price}
                      </span>
                      <span className="text-[0.68rem] uppercase font-semibold text-[#7A1C30]">
                        View Set
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
