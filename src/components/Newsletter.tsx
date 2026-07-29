'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export const Newsletter: React.FC = () => {
  const { data } = useContent();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (data.hiddenSections?.newsletter) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <section className="py-20 bg-[#7A1C30] text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="text-[0.72rem] tracking-[0.3em] uppercase text-[#C5A059] font-medium block mb-3">
          Private Invitations
        </span>
        <h3 className="font-serif-editorial text-3xl md:text-5xl font-normal tracking-wide mb-4">
          Join the Gaurangi Circle
        </h3>
        <p className="text-xs md:text-sm font-light text-[#FAF6EE]/80 max-w-lg mx-auto font-sans leading-relaxed mb-8">
          Receive exclusive early previews of limited handloom edits, artisanal stories, and private boutique events.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3.5 rounded-full border border-white/20 text-sm font-light">
            <CheckCircle2 size={18} className="text-[#C5A059]" />
            <span>Thank you for joining our private circle. Preview invitation sent.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <div className="relative w-full">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C5A059]" />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/50 text-sm outline-none focus:border-[#C5A059] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C5A059] hover:bg-[#D4AF37] text-[#1F1F1F] font-medium text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
            >
              <span>Subscribe</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
