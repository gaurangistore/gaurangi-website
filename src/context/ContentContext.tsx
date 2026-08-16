'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, setDoc, collection, getDocs, addDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { HomepageData, DEFAULT_HOMEPAGE_DATA } from '@/lib/contentDefaults';

export * from '@/lib/contentDefaults';

interface ContentContextType {
  data: HomepageData;
  rawData: HomepageData;
  isLoading: boolean;
  saveData: (newData: HomepageData) => Promise<boolean>;
  uploadImage: (base64String: string, filename: string) => Promise<string>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Replace `img:<docId>` references with their stored data URL from the images map.
// Recursively walks the whole content shape so every image field is resolved.
const resolveImageRefs = (value: unknown, images: Record<string, string>): unknown => {
  if (typeof value === 'string') {
    if (value.startsWith('img:')) {
      const resolved = images[value.slice(4)];
      return resolved !== undefined ? resolved : value;
    }
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((item) => resolveImageRefs(item, images));
  }
  if (value !== null && typeof value === 'object') {
    const out: { [key: string]: unknown } = {};
    for (const key of Object.keys(value)) {
      out[key] = resolveImageRefs((value as { [key: string]: unknown })[key], images);
    }
    return out;
  }
  return value;
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<HomepageData>(DEFAULT_HOMEPAGE_DATA);
  const [rawData, setRawData] = useState<HomepageData>(DEFAULT_HOMEPAGE_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const imageMapRef = useRef<Record<string, string>>({});

  // Load live data from Firestore or LocalStorage, then resolve image references.
  useEffect(() => {
    const fetchContent = async () => {
      try {
        let raw: HomepageData = DEFAULT_HOMEPAGE_DATA;

        // Try local storage cache first
        const cached = localStorage.getItem('gaurangi_homepage_content');
        if (cached) {
          try {
            raw = JSON.parse(cached);
          } catch (e) {
            console.warn('Ignoring corrupted local cache:', e);
          }
        }

        // Try Firestore live fetch
        const docRef = doc(db, 'content', 'homepage');
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          raw = snap.data() as HomepageData;
          localStorage.setItem('gaurangi_homepage_content', JSON.stringify(raw));
        }

        // Fetch all stored images into a lookup map
        const images: Record<string, string> = {};
        try {
          const imgs = await getDocs(collection(db, 'images'));
          imgs.forEach((imageDoc) => {
            const imgData = imageDoc.data();
            if (typeof imgData.data === 'string') {
              images[imageDoc.id] = imgData.data;
            }
          });
        } catch (err) {
          console.warn('Could not fetch stored images:', err);
        }
        imageMapRef.current = images;

        setRawData(raw);
        setData(resolveImageRefs(raw, images) as HomepageData);
      } catch (err) {
        console.warn('Using default fallback content:', err);
        setRawData(DEFAULT_HOMEPAGE_DATA);
        setData(DEFAULT_HOMEPAGE_DATA);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Save updated content to Firestore and LocalStorage.
  // `newData` uses `img:<docId>` references so the main document stays small.
  const saveData = async (newData: HomepageData): Promise<boolean> => {
    try {
      setRawData(newData);
      setData(resolveImageRefs(newData, imageMapRef.current) as HomepageData);
      localStorage.setItem('gaurangi_homepage_content', JSON.stringify(newData));

      // Sync with Firestore
      const docRef = doc(db, 'content', 'homepage');
      await setDoc(docRef, newData, { merge: true });
      return true;
    } catch (err) {
      console.error('Error saving content to Firestore:', err);
      // Local storage still succeeded in this browser, but report the failure
      // so the admin can surface it instead of claiming the publish worked.
      return false;
    }
  };

  // Upload Image Handler: Firebase Storage first, then Firestore document fallback.
  const uploadImage = async (base64String: string, filename: string): Promise<string> => {
    if (!base64String.startsWith('data:image')) {
      return base64String;
    }
    try {
      const storageRef = ref(storage, `images/${Date.now()}_${filename}`);
      await uploadString(storageRef, base64String, 'data_url');
      const downloadUrl = await getDownloadURL(storageRef);
      return downloadUrl;
    } catch (err) {
      console.warn('Firebase Storage upload failed, storing image in Firestore:', err);
      try {
        const imageDoc = await addDoc(collection(db, 'images'), {
          data: base64String,
          createdAt: new Date().toISOString(),
        });
        imageMapRef.current[imageDoc.id] = base64String;
        return `img:${imageDoc.id}`;
      } catch (err2) {
        console.error('Firestore image storage failed:', err2);
        return base64String;
      }
    }
  };

  return (
    <ContentContext.Provider value={{ data, rawData, isLoading, saveData, uploadImage }}>
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
