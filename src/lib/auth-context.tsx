'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { supabase, getSession, getUserProfile, UserProfile } from './supabase';

type AuthContextType = {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function refreshUser() {
    try {
      setLoading(true);
      const { data } = await getSession();
      
      if (data.session?.user) {
        setUser(data.session.user);
        
        // Fetch user profile
        const { data: profileData } = await getUserProfile(data.session.user.id);
        setProfile(profileData || null);
      } else {
        setUser(null);
        setProfile(null);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Initial session check
    refreshUser();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        
        // Fetch user profile
        const { data: profileData } = await getUserProfile(session.user.id);
        setProfile(profileData || null);
      } else {
        setUser(null);
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function handleSignOut() {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  const value = {
    user,
    profile,
    loading,
    signOut: handleSignOut,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 