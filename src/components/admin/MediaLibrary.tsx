'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { useContent } from '@/context/ContentContext';
import { Image as ImageIcon, Upload, Trash2, Copy, Check, Loader2 } from 'lucide-react';

interface MediaItem {
  id: string;
  data: string;
  filename: string;
  createdAt: string;
}

export const MediaLibrary: React.FC = () => {
  const [images, setImages] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { uploadImage } = useContent();

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'images'));
      const fetched: MediaItem[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (typeof data.data === 'string') {
          fetched.push({
            id: doc.id,
            data: data.data,
            filename: data.filename || 'Untitled',
            createdAt: data.createdAt || new Date().toISOString(),
          });
        }
      });
      // Sort by newest first
      fetched.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setImages(fetched);
    } catch (err) {
      console.error('Failed to fetch images:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        const uploadPromise = new Promise<void>((resolve, reject) => {
          reader.onloadend = async () => {
            try {
              const base64 = reader.result as string;
              const compressed = await compressImage(base64);
              await uploadImage(compressed, file.name);
              resolve();
            } catch (err) {
              reject(err);
            }
          };
          reader.readAsDataURL(file);
        });
        
        await uploadPromise;
      }
      await fetchImages();
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to upload some images.');
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image? If it is used on the website, it will appear broken.')) return;
    
    try {
      await deleteDoc(doc(db, 'images', id));
      setImages(images.filter((img) => img.id !== id));
    } catch (err) {
      console.error('Failed to delete image:', err);
      alert('Failed to delete image.');
    }
  };

  const copyToClipboard = (id: string) => {
    const ref = `img:${id}`;
    navigator.clipboard.writeText(ref);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-[#EAE5D9] shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-xl font-serif-editorial text-[#0A2A54] flex items-center gap-2">
            <ImageIcon className="text-[#C5A059]" /> Media Library
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Upload images here once, and use their reference code across the website.
          </p>
        </div>
        
        <div>
          <label className="bg-[#0A2A54] hover:bg-[#0A2A54]/90 text-white px-5 py-2.5 rounded-full text-sm font-medium cursor-pointer inline-flex items-center gap-2 transition-colors">
            {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
            {isUploading ? 'Uploading...' : 'Upload Images'}
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              className="hidden" 
              onChange={handleFileUpload} 
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="animate-spin text-[#C5A059]" size={32} />
        </div>
      ) : images.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-xl">
          <ImageIcon className="mx-auto text-gray-300 mb-3" size={48} />
          <h3 className="text-lg font-medium text-gray-900">No images yet</h3>
          <p className="text-sm text-gray-500 mt-1">Upload your first image to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {images.map((img) => (
            <div key={img.id} className="group relative bg-gray-50 rounded-xl overflow-hidden border border-gray-200 aspect-square flex items-center justify-center">
              {/* Image Preview */}
              <img 
                src={img.data} 
                alt={img.filename} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                <div className="flex justify-end">
                  <button 
                    onClick={() => handleDelete(img.id)}
                    className="p-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    title="Delete Image"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                
                <div className="text-center">
                  <button 
                    onClick={() => copyToClipboard(img.id)}
                    className="w-full py-1.5 bg-white text-gray-900 text-xs font-medium rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center gap-1.5"
                  >
                    {copiedId === img.id ? (
                      <><Check size={12} className="text-green-600" /> Copied!</>
                    ) : (
                      <><Copy size={12} /> Copy Ref</>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Filename banner at bottom (visible when not hovering) */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 pt-6 pointer-events-none group-hover:opacity-0 transition-opacity">
                <p className="text-white text-[10px] truncate">{img.filename}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
