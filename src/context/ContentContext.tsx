'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { DUMMY_IMAGE } from '@/lib/constants';

// Types for all Homepage Sections
export interface HeroSlide {
  id: number;
  badge: string;
  title: string;
  italicTitle: string;
  tagline: string;
  weave: string;
  craft: string;
  occasion: string;
  image: string;
}

export interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
}

export interface ProductItem {
  id: string;
  name: string;
  fabric: string;
  price: string;
  image: string;
  category: string;
}

export interface OccasionItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  gridSpan: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  count: string;
  image: string;
  description: string;
}

export interface CustomerStoryItem {
  id: string;
  name: string;
  location: string;
  quote: string;
  image: string;
  occasion: string;
}

export interface SiteContactInfo {
  storeName: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  instagram: string;
}

export interface SectionVisibility {
  heroBanner?: boolean;
  featuredCategories?: boolean;
  newArrivals?: boolean;
  whyGaurangi?: boolean;
  customerStories?: boolean;
  newsletter?: boolean;
}

export interface HomepageData {
  hiddenSections?: SectionVisibility;
  heroSlides: HeroSlide[];
  collections: CollectionItem[];
  products: ProductItem[];
  occasions: OccasionItem[];
  categories: CategoryItem[];
  customerStories: CustomerStoryItem[];
  contactInfo: SiteContactInfo;
}

// Default Fallback Initial Content
export const DEFAULT_HOMEPAGE_DATA: HomepageData = {
  hiddenSections: {
    heroBanner: false,
    featuredCategories: false,
    newArrivals: false,
    whyGaurangi: false,
    customerStories: false,
    newsletter: false,
  },
  heroSlides: [
    {
      id: 1,
      badge: 'Editorial Selection • 2026',
      title: 'Autumn',
      italicTitle: 'Heritage',
      tagline: 'Crafted for celebrations. Designed for timeless elegance. Discover handloom silk weaves, real zari embroidery, and bespoke luxury tailoring.',
      weave: 'Banarasi Silk',
      craft: 'Zari Work',
      occasion: 'Festive Edit',
      image: DUMMY_IMAGE,
    },
    {
      id: 2,
      badge: 'Artisanal Handcraft • 2026',
      title: 'Festive',
      italicTitle: 'Splendor',
      tagline: 'Vibrant silk weaves & intricate hand-embroidery woven by master artisans for grand royal celebrations.',
      weave: 'Organza Silk',
      craft: 'Floral Zardosi',
      occasion: 'Bridal Sangeet',
      image: DUMMY_IMAGE,
    },
    {
      id: 3,
      badge: 'Royal Weaves • 2026',
      title: 'Kanjivaram',
      italicTitle: 'Grace',
      tagline: 'Pure mulberry silk with authentic gold & silver zari borders crafted for unforgettable wedding moments.',
      weave: 'Kanjivaram Silk',
      craft: 'Gold Threading',
      occasion: 'Grand Wedding',
      image: DUMMY_IMAGE,
    },
  ],
  collections: [
    {
      id: 'col-1',
      title: 'Wedding Collection',
      subtitle: 'Woven for grand celebrations and sacred vows.',
      image: DUMMY_IMAGE,
      tag: 'Haute Couture',
    },
    {
      id: 'col-2',
      title: 'Festive Splendor',
      subtitle: 'Vibrant silk weaves & intricate hand-embroidery.',
      image: DUMMY_IMAGE,
      tag: 'Artisanal Edit',
    },
    {
      id: 'col-3',
      title: 'Daily Elegance',
      subtitle: 'Breathable linen & lightweight organic cottons.',
      image: DUMMY_IMAGE,
      tag: 'Everyday Chic',
    },
    {
      id: 'col-4',
      title: 'Contemporary Formals',
      subtitle: 'Structured silhouettes for modern executive grace.',
      image: DUMMY_IMAGE,
      tag: 'Modern Tailoring',
    },
  ],
  products: [
    {
      id: 'arr-1',
      name: 'Chanderi Zari Silk Ensemble',
      fabric: 'Handloom Chanderi Silk',
      price: '₹ 14,500',
      image: DUMMY_IMAGE,
      category: 'Festive Wear',
    },
    {
      id: 'arr-2',
      name: 'Organza Floral Embroidered Saree',
      fabric: 'Pure Organza & Metallic Thread',
      price: '₹ 18,900',
      image: DUMMY_IMAGE,
      category: 'Luxury Handcraft',
    },
    {
      id: 'arr-3',
      name: 'Tussar Raw Silk Dress Material',
      fabric: 'Unstitched Pure Silk & Dupatta',
      price: '₹ 12,200',
      image: DUMMY_IMAGE,
      category: 'Dress Materials',
    },
    {
      id: 'arr-4',
      name: 'Ivory Zardosi Velvet Jacket',
      fabric: 'Hand-embroidered Micro Velvet',
      price: '₹ 22,000',
      image: DUMMY_IMAGE,
      category: 'Haute Outerwear',
    },
  ],
  occasions: [
    {
      id: 'occ-1',
      title: 'Wedding Celebrations',
      subtitle: 'Royal weaves & embroidered grandeur',
      image: DUMMY_IMAGE,
      gridSpan: 'md:col-span-2 md:row-span-2',
    },
    {
      id: 'occ-2',
      title: 'Festive Rituals',
      subtitle: 'Silk drapes & vibrant hues',
      image: DUMMY_IMAGE,
      gridSpan: 'md:col-span-1 md:row-span-1',
    },
    {
      id: 'occ-3',
      title: 'Evening Galas',
      subtitle: 'Backless velvet & satin slips',
      image: DUMMY_IMAGE,
      gridSpan: 'md:col-span-1 md:row-span-1',
    },
    {
      id: 'occ-4',
      title: 'Executive Wear',
      subtitle: 'Structured linen & tailored formals',
      image: DUMMY_IMAGE,
      gridSpan: 'md:col-span-1 md:row-span-1',
    },
    {
      id: 'occ-5',
      title: 'Casual Luxury',
      subtitle: 'Hand-printed cottons & easy coordinates',
      image: DUMMY_IMAGE,
      gridSpan: 'md:col-span-1 md:row-span-1',
    },
  ],
  categories: [
    {
      id: 'dress-materials',
      name: 'Dress Materials',
      count: '34 Curated Edits',
      image: DUMMY_IMAGE,
      description: 'Unstitched pure silks, hand-embroidered organza & linen coordinates ready for bespoke tailoring.',
    },
    {
      id: 'heritage-sarees',
      name: 'Heritage Sarees',
      count: '42 Masterpieces',
      image: DUMMY_IMAGE,
      description: 'Kanjivarams, Banarasis, Chanderis & Tussars woven by master handloom weavers.',
    },
  ],
  customerStories: [
    {
      id: 's1',
      name: 'Ananya Sharma',
      location: 'New Delhi',
      quote: 'The Chanderi silk weave felt completely weightless during my sister’s sangeet. The drape is so soft and regal.',
      image: DUMMY_IMAGE,
      occasion: 'Sister’s Sangeet Ceremony',
    },
    {
      id: 's2',
      name: 'Rohan & Meera Merchant',
      location: 'Mumbai',
      quote: 'We wanted matching heritage outfits that didn’t feel over-dramatic. Gaurangi delivered pure timeless luxury.',
      image: DUMMY_IMAGE,
      occasion: 'Anniversary Celebration',
    },
  ],
  contactInfo: {
    storeName: 'Gaurangi Fashions',
    tagline: 'A premium digital fashion boutique where every collection tells a story.',
    address: 'Boutique Flagship, Heritage Enclave, New Delhi',
    phone: '+91 98765 43210',
    email: 'concierge@gaurangifashions.com',
    instagram: '@GaurangiFashions',
  },
};

interface ContentContextType {
  data: HomepageData;
  isLoading: boolean;
  saveData: (newData: HomepageData) => Promise<boolean>;
  uploadImage: (base64String: string, filename: string) => Promise<string>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<HomepageData>(DEFAULT_HOMEPAGE_DATA);
  const [isLoading, setIsLoading] = useState(true);

  // Load live data from Firestore or LocalStorage
  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Try local storage cache first
        const cached = localStorage.getItem('gaurangi_homepage_content');
        if (cached) {
          setData(JSON.parse(cached));
        }

        // Try Firestore live fetch
        const docRef = doc(db, 'content', 'homepage');
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const liveData = snap.data() as HomepageData;
          setData(liveData);
          localStorage.setItem('gaurangi_homepage_content', JSON.stringify(liveData));
        }
      } catch (err) {
        console.warn('Using default fallback content:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Save updated content to Firestore and LocalStorage
  const saveData = async (newData: HomepageData): Promise<boolean> => {
    try {
      setData(newData);
      localStorage.setItem('gaurangi_homepage_content', JSON.stringify(newData));

      // Sync with Firestore
      const docRef = doc(db, 'content', 'homepage');
      await setDoc(docRef, newData, { merge: true });
      return true;
    } catch (err) {
      console.error('Error saving content to Firestore:', err);
      // Fallback: local storage succeeded
      return true;
    }
  };

  // Upload Image Handler (Firebase Storage or Base64 fallback)
  const uploadImage = async (base64String: string, filename: string): Promise<string> => {
    try {
      if (base64String.startsWith('data:image')) {
        const storageRef = ref(storage, `images/${Date.now()}_${filename}`);
        await uploadString(storageRef, base64String, 'data_url');
        const downloadUrl = await getDownloadURL(storageRef);
        return downloadUrl;
      }
      return base64String;
    } catch (err) {
      console.warn('Firebase Storage fallback to Data URL:', err);
      return base64String; // Return Data URL directly if storage is offline
    }
  };

  return (
    <ContentContext.Provider value={{ data, isLoading, saveData, uploadImage }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
