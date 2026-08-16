'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Heart, ShoppingBag, Truck, RefreshCw, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { useContent } from '@/context/ContentContext';
import { getImageUrl } from '@/lib/constants';
import { getTechniqueName } from '@/lib/constants';

export const ProductContent: React.FC = () => {
  const { data, isLoading } = useContent();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const products = data.products || [];
  const product = id ? products.find((p) => p.id === id) : undefined;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-canvas text-ink flex flex-col overflow-x-hidden">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-32">
          <span className="mono text-ink-soft">Loading the piece…</span>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-canvas text-ink flex flex-col overflow-x-hidden">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center text-center py-32 px-6">
          <span className="mono text-rose mb-3">Piece unavailable</span>
          <h1 className="font-display italic text-3xl md:text-4xl mb-2">
            This piece is no longer available
          </h1>
          <p className="text-ink-soft text-sm max-w-[360px] mb-8">
            It may have been sold or removed. Browse the full edit to find another favourite.
          </p>
          <Link href="/shop" className="btn-outline">
            Back to the Edit
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const similarProducts = products.filter((p) => p.id !== product.id).slice(0, 4);
  const techniqueLabel = getTechniqueName(product.technique);
  const settings = data.productPageSettings;
  const whatsAppNumber = settings?.whatsAppNumber || '+919876543210';
  const specsSectionTitle = settings?.specsSectionTitle || 'About This Piece';

  const specs: { label: string; value?: string }[] = [
    { label: 'Base fabric', value: product.fabric },
    { label: 'Technique', value: techniqueLabel },
    { label: 'Included', value: product.topMetres },
    { label: 'Craft & care', value: product.craft || product.washCare },
  ].filter((s) => Boolean(s.value));

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col overflow-x-hidden">
      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="bg-paper border-b border-border-hair py-3">
        <div className="wrap flex items-center gap-2 text-xs text-ink-soft">
          <Link href="/" className="hover:text-rose">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-rose">Shop</Link>
          <span>/</span>
          <span className="text-rose font-medium truncate max-w-[200px] md:max-w-none">{product.name}</span>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <main className="py-10 md:py-14 max-w-7xl mx-auto w-full flex-1">
        <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Product Photo Display */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper border border-border-hair stitch">
              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-paper/90 backdrop-blur-md text-[0.68rem] tracking-widest uppercase font-semibold text-ink border border-border-hair">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Product Meta, Price, Fabric Specs & CTAs */}
          <div className="lg:col-span-6 space-y-7">
            <div className="space-y-3 pb-6 border-b border-border-hair">
              {product.category && (
                <div className="flex items-center gap-3">
                  <span className="mono text-rose block">{product.category}</span>
                  {techniqueLabel && (
                    <span className="mono text-ink-soft block">{techniqueLabel}</span>
                  )}
                </div>
              )}
              {product.name && (
                <h1 className="font-display text-3xl md:text-4xl text-ink leading-tight">
                  {product.name}
                </h1>
              )}

              {product.price && (
                <div className="flex items-center gap-3 pt-2">
                  <span className="font-sans text-3xl font-bold tracking-tight text-ink">
                    {product.price}
                  </span>
                  <span className="mono text-rose text-[10.5px]">est. pricing</span>
                </div>
              )}

              {product.description && (
                <p className="text-sm text-ink-soft font-light leading-relaxed pt-2">
                  {product.description}
                </p>
              )}
            </div>

            {/* Specifications Box */}
            {specs.length > 0 && (
              <div className="bg-paper p-5 md:p-6 border border-border-hair space-y-3">
                <h3 className="font-display text-lg text-ink flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-rose" /> {specsSectionTitle}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                  {specs.map((spec) => (
                    <div key={spec.label} className="border border-border-hair p-3.5">
                      <span className="mono text-ink-soft block mb-0.5">{spec.label}</span>
                      <span className="text-ink font-medium block">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action CTAs */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <button className="flex-1 btn-primary justify-center py-4 text-sm font-semibold tracking-wider">
                  <ShoppingBag size={18} /> Add to Bag
                </button>
                <button
                  className="w-14 h-14 shrink-0 rounded-full border border-ink flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-colors"
                  title="Wishlist"
                  aria-label="Wishlist"
                >
                  <Heart size={20} />
                </button>
              </div>

              <a
                href={`https://wa.me/${whatsAppNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi Gaurangi! I want to inquire about ${product.name} (${product.price || ''}).`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-full border border-emerald text-emerald hover:bg-emerald hover:text-paper transition-all text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} /> Order via WhatsApp
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border-hair text-center text-xs text-ink-soft">
              <div className="flex flex-col items-center gap-1.5 py-2">
                <Truck size={20} className="text-rose" />
                <span>Free shipping across India</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 py-2">
                <ShieldCheck size={20} className="text-rose" />
                <span>Hand-cut, not laser-cut</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 py-2">
                <RefreshCw size={20} className="text-rose" />
                <span>Easy 7-day returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Pieces Section */}
        {similarProducts.length > 0 && (
          <section className="wrap mt-16 md:mt-24 pt-12 md:pt-16 border-t border-border-hair">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="mono text-rose block mb-1">You May Also Like</span>
                <h2 className="font-display italic text-2xl md:text-3xl text-ink">
                  More from the edit
                </h2>
              </div>
              <Link href="/shop" className="link-under text-xs uppercase tracking-widest text-ink font-semibold">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {similarProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};
