'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { updateUserProfile } from '@/lib/authService';
import { Loader2, CheckCircle2 } from 'lucide-react';

export default function ProfileTab() {
  const { profile, user, refreshProfile } = useAuth();
  
  const [displayName, setDisplayName] = useState(profile?.displayName || '');
  const [phone, setPhone] = useState(profile?.phoneNumber || '');
  
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
        displayName,
        phoneNumber: phone
      });
      await refreshProfile();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="font-serif text-2xl text-ink mb-6">Profile Details</h3>
      
      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded text-sm">{error}</div>}
      {success && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded text-sm flex items-center gap-2">
          <CheckCircle2 size={16} /> Profile updated successfully.
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5 max-w-md">
        <div>
          <label className="block text-sm font-medium text-ink mb-1">Email Address</label>
          <input
            type="email"
            disabled
            value={profile?.email || 'N/A (Phone Auth)'}
            className="w-full px-3 py-2 border border-border-hair rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
          />
          <p className="text-xs text-ink-soft mt-1">Your email address cannot be changed.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1">Full Name</label>
          <input
            type="text"
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-3 py-2 border border-border-hair rounded-md focus:outline-none focus:ring-1 focus:ring-rose"
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border border-border-hair rounded-md focus:outline-none focus:ring-1 focus:ring-rose"
            placeholder="+1 234 567 890"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-ink text-white px-6 py-2 rounded-md font-medium hover:bg-rose transition-colors flex items-center disabled:opacity-50"
        >
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Save Changes
        </button>
      </form>
    </div>
  );
}
