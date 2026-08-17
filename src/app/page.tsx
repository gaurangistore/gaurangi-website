import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ShopByCategory } from '@/components/ShopByCategory';
import { CraftSection } from '@/components/CraftSection';
import { NewArrivals } from '@/components/NewArrivals';
import { WhyGaurangi } from '@/components/WhyGaurangi';
import { StyleInspiration } from '@/components/StyleInspiration';
import { Newsletter } from '@/components/Newsletter';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas text-ink overflow-x-hidden">
      {/* 1. Header & Navigation */}
      <Navbar />

      {/* 2. Hero Banner */}
      <HeroSection />

      {/* 3. Shop by Category */}
      <ShopByCategory />

      {/* 4. New Arrivals */}
      <NewArrivals />

      {/* 5. Why Gaurangi */}
      <WhyGaurangi />

      {/* 6. The Craft (merged with Artisan story) */}
      <CraftSection />

      {/* 7. Style Inspiration — wear it your way */}
      <StyleInspiration />

      {/* 8. Newsletter Subscription */}
      <Newsletter />

      {/* 9. Footer */}
      <Footer />
    </main>
  );
}
