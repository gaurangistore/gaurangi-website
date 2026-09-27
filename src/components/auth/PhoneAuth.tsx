'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { Loader2 } from 'lucide-react';

declare global {
  interface Window {
    recaptchaVerifier: any;
    grecaptcha: any;
  }
}

export default function PhoneAuth({ isLogin }: { isLogin: boolean }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Initialize recaptcha when component mounts
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
    }
  }, []);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (!window.recaptchaVerifier) throw new Error("Recaptcha not initialized");
      
      const appVerifier = window.recaptchaVerifier;
      // Phone number must be in E.164 format (e.g. +16505551234)
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
      
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(confirmation);
      setMessage('OTP sent to your phone.');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to send OTP.');
      // Reset recaptcha on error so user can try again
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.render().then((widgetId: any) => {
          window.grecaptcha.reset(widgetId);
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmationResult) return;
    
    setLoading(true);
    setError('');

    try {
      await confirmationResult.confirm(otp);
      // Successful sign in, auth state will automatically update
    } catch (err: any) {
      setError(err.message || 'Invalid OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div id="recaptcha-container"></div>
      
      {error && <div className="text-sm text-red-500 bg-red-50 p-2 rounded mb-4">{error}</div>}
      {message && <div className="text-sm text-green-600 bg-green-50 p-2 rounded mb-4">{message}</div>}

      {!confirmationResult ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-transparent focus:outline-none focus:ring-1 focus:ring-gold-ink"
              placeholder="+1234567890"
            />
            <p className="text-xs text-gray-500 mt-1">Include country code (e.g. +1 or +91)</p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-ivory py-2 rounded font-medium hover:bg-burgundy hover:text-white transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
            {isLogin ? 'Send OTP to Login' : 'Send OTP to Sign Up'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Enter OTP</label>
            <input
              type="text"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-transparent focus:outline-none focus:ring-1 focus:ring-gold-ink"
              placeholder="123456"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-ivory py-2 rounded font-medium hover:bg-burgundy hover:text-white transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
            Verify & {isLogin ? 'Login' : 'Sign Up'}
          </button>
          <button
            type="button"
            onClick={() => setConfirmationResult(null)}
            className="w-full text-sm text-gray-500 hover:text-ink underline"
          >
            Back to phone number
          </button>
        </form>
      )}
    </div>
  );
}
