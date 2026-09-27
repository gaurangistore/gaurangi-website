'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { UserRole } from '@/lib/authService';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // User not logged in, redirect to auth
        router.push('/auth');
      } else if (requiredRole && profile?.role !== requiredRole) {
        // User logged in but wrong role, redirect to home
        router.push('/');
      }
    }
  }, [user, profile, loading, requiredRole, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory text-ink">
        <Loader2 className="h-8 w-8 animate-spin text-gold-ink" />
      </div>
    );
  }

  // If we require a role and we don't have it, don't render children (effect will redirect)
  if (!user || (requiredRole && profile?.role !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
}
