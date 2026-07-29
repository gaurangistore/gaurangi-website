import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedCategories } from '@/components/FeaturedCategories';
import { NewArrivals } from '@/components/NewArrivals';
import { WhyGaurangi } from '@/components/WhyGaurangi';
import { CustomerStories } from '@/components/CustomerStories';
import { Newsletter } from '@/components/Newsletter';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF6EE] text-[#1F1F1F] selection:bg-[#7A1C30] selection:text-white">
      {/* 1. Header & Navigation */}
      <Navbar />

      {/* 2. Hero Banner (Single Image, Single Message, Single CTA: Shop Now) */}
      <HeroSection />

      {/* 3. Featured Fabric Categories (Pure Silk, Organza, Banarasi, Chanderi, Linen, Cotton) */}
      <FeaturedCategories />

      {/* 4. New Arrivals (8 Featured Products Grid) */}
      <NewArrivals />

      {/* 5. Why Gaurangi (4 Scannable Trust Pillars) */}
      <WhyGaurangi />

      {/* 6. Customer Reviews (3 Verified Stories) */}
      <CustomerStories />

      {/* 7. Newsletter Subscription */}
      <Newsletter />

      {/* 8. Boutique Footer */}
      <Footer />
    </main>
  );
}
