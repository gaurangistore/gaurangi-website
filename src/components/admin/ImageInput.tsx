'use client';

import React, { useState } from 'react';
import { MediaLibrary } from './MediaLibrary';
import { X, Image as ImageIcon } from 'lucide-react';

interface ImageInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ImageInput: React.FC<ImageInputProps> = ({ value, onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-3 py-2 text-xs border border-[#D8CBB9] rounded-lg outline-none"
        placeholder="Paste image ref (e.g., img:123) or click Gallery"
      />
      
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-[#741F2B] text-white rounded-lg text-xs font-medium hover:bg-[#5C1722] transition-colors flex items-center gap-2"
      >
        <ImageIcon size={14} />
        Gallery
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50 shrink-0">
              <h2 className="text-xl font-serif-editorial text-[#741F2B] font-medium">Select Image</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 bg-white text-gray-400 hover:text-gray-900 rounded-full border border-gray-200 shadow-sm transition-all hover:bg-gray-50"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <MediaLibrary onSelect={(ref) => {
                onChange(ref);
                setIsModalOpen(false);
              }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
