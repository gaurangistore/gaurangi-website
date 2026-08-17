'use client';

import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';

export const Newsletter: React.FC = () => {
  const { data } = useContent();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (data.hiddenSections?.newsletter) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail('');
  };

  return (
    <div className="wrap">
      <div className="newsletter bg-rose text-paper text-center py-12 md:py-16">
        <div className="max-w-[560px] mx-auto px-6">
          <h2 className="font-display italic text-[clamp(28px,3.6vw,38px)] mb-3">
            Join the Gaurangi circle
          </h2>
          <p className="text-paper/90 max-w-[440px] mx-auto mb-7 text-[14.5px]">
            New pieces arrive from Pipili in small batches. Be the first to know when a new piece is ready.
          </p>

          {submitted ? (
            <p className="mono text-paper">Thank you — you&rsquo;re on the list.</p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row justify-center gap-2.5 max-w-[420px] mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                aria-label="Email address"
                className="flex-1 min-w-[200px] px-4 py-3.5 text-[14px] font-sans text-ink border-none outline-none"
              />
              <button
                type="submit"
                className="bg-ink text-paper px-6 py-3.5 font-semibold text-[13.5px] cursor-pointer min-h-[44px]"
              >
                Notify me
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
