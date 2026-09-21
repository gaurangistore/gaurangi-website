'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { updateUserProfile, Address } from '@/lib/authService';
import { Loader2, CheckCircle2 } from 'lucide-react';

export default function AddressesTab() {
  const { profile, refreshProfile } = useAuth();
  
  const [shipping, setShipping] = useState<Address>({
    fullName: profile?.shippingAddress?.fullName || '',
    street: profile?.shippingAddress?.street || '',
    city: profile?.shippingAddress?.city || '',
    state: profile?.shippingAddress?.state || '',
    postalCode: profile?.shippingAddress?.postalCode || '',
    country: profile?.shippingAddress?.country || '',
    phone: profile?.shippingAddress?.phone || '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await updateUserProfile(profile.uid, {
        shippingAddress: shipping,
      });
      await refreshProfile();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update addresses.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShipping(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h3 className="font-serif text-2xl text-ink mb-6">Saved Addresses</h3>
      
      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded text-sm">{error}</div>}
      {success && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded text-sm flex items-center gap-2">
          <CheckCircle2 size={16} /> Address updated successfully.
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-xl border border-border-hair">
          <h4 className="font-medium text-lg text-ink mb-4">Default Shipping Address</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-ink mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                value={shipping.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border-hair rounded-md focus:outline-none focus:ring-1 focus:ring-rose"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-ink mb-1">Street Address</label>
              <input
                type="text"
                name="street"
                required
                value={shipping.street}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border-hair rounded-md focus:outline-none focus:ring-1 focus:ring-rose"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1">City</label>
              <input
                type="text"
                name="city"
                required
                value={shipping.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border-hair rounded-md focus:outline-none focus:ring-1 focus:ring-rose"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1">State / Province</label>
              <input
                type="text"
                name="state"
                required
                value={shipping.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border-hair rounded-md focus:outline-none focus:ring-1 focus:ring-rose"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1">ZIP / Postal Code</label>
              <input
                type="text"
                name="postalCode"
                required
                value={shipping.postalCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border-hair rounded-md focus:outline-none focus:ring-1 focus:ring-rose"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1">Country</label>
              <input
                type="text"
                name="country"
                required
                value={shipping.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border-hair rounded-md focus:outline-none focus:ring-1 focus:ring-rose"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-ink mb-1">Phone Number (for delivery)</label>
              <input
                type="tel"
                name="phone"
                required
                value={shipping.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border-hair rounded-md focus:outline-none focus:ring-1 focus:ring-rose"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-ink text-white px-6 py-2 rounded-md font-medium hover:bg-rose transition-colors flex items-center disabled:opacity-50"
        >
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Save Address
        </button>
      </form>
    </div>
  );
}
