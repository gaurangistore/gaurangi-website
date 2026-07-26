import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedCollections } from '@/components/FeaturedCollections';
import { NewArrivals } from '@/components/NewArrivals';
import { WhyGaurangi } from '@/components/WhyGaurangi';
import { ShopByOccasion } from '@/components/ShopByOccasion';
import { TrendingCategories } from '@/components/TrendingCategories';
import { Lookbook } from '@/components/Lookbook';
import { CustomerStories } from '@/components/CustomerStories';
import { InstagramGallery } from '@/components/InstagramGallery';
import { Newsletter } from '@/components/Newsletter';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF6EE] text-[#1F1F1F] selection:bg-[#7A1C30] selection:text-white">
      {/* 1. Transparent to Sticky Navigation */}
      <Navbar />

      {/* 2. Magazine Cover Hero Section */}
      <HeroSection />

      {/* 3. Featured Collections */}
      <FeaturedCollections />

      {/* 4. New Arrivals Horizontal Carousel */}
      <NewArrivals />

      {/* 5. "Why Gaurangi" Brand Storytelling */}
      <WhyGaurangi />

      {/* 6. Shop by Occasion */}
      <ShopByOccasion />

      {/* 7. Trending Categories */}
      <TrendingCategories />

      {/* 8. Featured Lookbook */}
      <Lookbook />

      {/* 9. Customer Stories */}
      <CustomerStories />

      {/* 10. Instagram Gallery */}
      <InstagramGallery />

      {/* 11. Private Invitations Newsletter */}
      <Newsletter />

      {/* 12. Brand Footer */}
      <Footer />
    </main>
  );
}
