'use client';

import React, { useState } from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useContent } from '@/context/ContentContext';

type Status = 'idle' | 'submitting' | 'done' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const Newsletter: React.FC = () => {
  const { data } = useContent();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  if (data.hiddenSections?.newsletter) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = email.trim().toLowerCase();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    setMessage('');

    try {
      // The document id is the email itself, so re-subscribing overwrites the
      // existing record instead of creating a duplicate row.
      await setDoc(doc(collection(db, 'newsletter'), trimmed), {
        email: trimmed,
        createdAt: new Date().toISOString(),
        source: 'homepage',
      });
      setStatus('done');
      setMessage('Thank you — you are on the list.');
      setEmail('');
    } catch (err) {
      console.error('Newsletter signup failed:', err);
      setStatus('error');
      setMessage('We could not save your email. Please try again.');
    }
  };

  return (
    <div className="wrap">
      <div className="newsletter bg-burgundy text-paper text-center py-12 md:py-16">
        <div className="max-w-[560px] mx-auto px-6">
          <h2 className="font-display italic text-[clamp(28px,3.6vw,38px)] mb-3">
            Join the Gaurangi circle
          </h2>
          <p className="text-paper/90 max-w-[440px] mx-auto mb-7 text-[14.5px]">
            New pieces arrive from Pipili in small batches. Be the first to know when a new piece is
            ready.
          </p>

          {status === 'done' ? (
            <p className="mono text-paper" role="status">
              {message}
            </p>
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
                disabled={status === 'submitting'}
                placeholder="you@email.com"
                aria-label="Email address"
                aria-invalid={status === 'error'}
                aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                className="flex-1 min-w-[200px] px-4 py-3.5 text-[14px] font-sans text-ink border-none outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="bg-ink text-paper px-6 py-3.5 font-semibold text-[13.5px] cursor-pointer min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Saving…' : 'Notify me'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p id="newsletter-error" role="alert" className="mt-3 text-[13px] text-paper/90">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
