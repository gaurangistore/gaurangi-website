import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { User } from 'firebase/auth';

export type UserRole = 'admin' | 'user';

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  phoneNumber: string | null;
  role: UserRole;
  createdAt: string;
  displayName?: string;
  shippingAddress?: Address;
  billingAddress?: Address;
}

/**
 * Fetches the user profile from Firestore.
 * If the profile does not exist, it creates a new one with the default 'user' role.
 */
export async function getUserProfile(user: User): Promise<UserProfile> {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data() as UserProfile;
  } else {
    // Create new user profile with default 'user' role
    const newUserProfile: UserProfile = {
      uid: user.uid,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: 'user', // Default role is 'user'. Must manually change to 'admin' in Firestore.
      createdAt: new Date().toISOString(),
      displayName: user.displayName || '',
    };
    
    try {
      await setDoc(userRef, newUserProfile);
    } catch (error) {
      console.error("Error creating user profile:", error);
    }
    
    return newUserProfile;
  }
}

/**
 * Updates the user profile in Firestore.
 */
export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, data, { merge: true });
}
