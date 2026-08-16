'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { HomepageData, DEFAULT_HOMEPAGE_DATA } from '@/lib/contentDefaults';

export * from '@/lib/contentDefaults';

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
