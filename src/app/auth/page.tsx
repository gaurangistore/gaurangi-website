'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import EmailAuth from '@/components/auth/EmailAuth';
import GoogleAuth from '@/components/auth/GoogleAuth';
import PhoneAuth from '@/components/auth/PhoneAuth';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

type AuthMethod = 'email' | 'phone';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [method, setMethod] = useState<AuthMethod>('email');
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && profile) {
      if (profile.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }
  }, [user, profile, loading, router]);

  if (loading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <Loader2 className="h-8 w-8 animate-spin text-rose" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas px-4 py-12 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-rose opacity-10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-ink opacity-5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-8 relative z-10">
        
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="font-serif text-3xl italic tracking-tight text-ink">Gaurangi</span>
          </Link>
          <h1 className="text-2xl font-medium font-serif tracking-tight text-ink mb-2">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="text-gray-500 text-sm">
            {isLogin ? 'Enter your details to sign in.' : 'Join us to wear heritage your own way.'}
          </p>
        </div>

        {/* Google Auth Button */}
        <div className="mb-6">
          <GoogleAuth isLogin={isLogin} />
        </div>

        <div className="relative flex py-5 items-center mb-2">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or continue with</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Method Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
          <button
            onClick={() => setMethod('email')}
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
              method === 'email' ? 'bg-white text-ink shadow-sm' : 'text-gray-500 hover:text-ink'
            }`}
          >
            Email
          </button>
          <button
            onClick={() => setMethod('phone')}
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
              method === 'phone' ? 'bg-white text-ink shadow-sm' : 'text-gray-500 hover:text-ink'
            }`}
          >
            Phone
          </button>
        </div>

        {/* Auth Forms */}
        <div className="mb-6 min-h-[220px]">
          {method === 'email' && <EmailAuth isLogin={isLogin} />}
          {method === 'phone' && <PhoneAuth isLogin={isLogin} />}
        </div>

        {/* Toggle Login / Signup */}
        <div className="text-center text-sm text-gray-500 mt-6 pt-6 border-t border-gray-100">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-ink font-medium hover:underline focus:outline-none focus:underline"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}
