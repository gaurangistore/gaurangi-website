'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { LogOut, User, Package, MapPin } from 'lucide-react';
import ProfileTab from '@/components/account/ProfileTab';
import OrdersTab from '@/components/account/OrdersTab';
import AddressesTab from '@/components/account/AddressesTab';

type Tab = 'profile' | 'orders' | 'addresses';

export default function AccountPage() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-canvas py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-8">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 shrink-0 bg-white border border-border-hair rounded-2xl p-6 shadow-sm">
              <div className="mb-8">
                <h2 className="font-serif text-2xl text-ink">My Account</h2>
                <p className="text-sm text-ink-soft mt-1">Hello, {profile?.displayName || 'Guest'}</p>
              </div>

              <nav className="flex flex-col gap-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'profile' ? 'bg-rose/10 text-rose' : 'text-ink hover:bg-gray-50'
                  }`}
                >
                  <User size={18} /> Profile Details
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'orders' ? 'bg-rose/10 text-rose' : 'text-ink hover:bg-gray-50'
                  }`}
                >
                  <Package size={18} /> Order History
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'addresses' ? 'bg-rose/10 text-rose' : 'text-ink hover:bg-gray-50'
                  }`}
                >
                  <MapPin size={18} /> Saved Addresses
                </button>

                <div className="my-4 border-t border-border-hair"></div>

                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} /> Sign Out
                </button>
              </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 w-full bg-white border border-border-hair rounded-2xl p-6 shadow-sm min-h-[500px]">
              {activeTab === 'profile' && <ProfileTab />}
              {activeTab === 'orders' && <OrdersTab />}
              {activeTab === 'addresses' && <AddressesTab />}
            </div>

          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
