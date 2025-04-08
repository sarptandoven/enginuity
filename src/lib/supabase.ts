'use client';

import { createClient } from '@supabase/supabase-js';

// Define database types
export type WaitlistEntry = {
  id: string;
  email: string;
  created_at: string;
  status: 'pending' | 'approved' | 'rejected';
};

export type UserProfile = {
  id: string;
  user_id: string;
  full_name: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
};

// Define database schema
export type Database = {
  public: {
    Tables: {
      waitlist: {
        Row: WaitlistEntry;
        Insert: Omit<WaitlistEntry, 'id' | 'created_at' | 'status'>;
        Update: Partial<WaitlistEntry>;
      };
      profiles: {
        Row: UserProfile;
        Insert: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<UserProfile, 'id' | 'created_at'>>;
      };
    };
  };
};

if (
  typeof window !== 'undefined' &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL
) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (
  typeof window !== 'undefined' &&
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
}

// Initialize the Supabase client
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    },
    db: {
      schema: 'public',
    },
  }
);

// Helper functions for authentication
export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  
  if (data.user && !error) {
    // Create a profile for the user
    await supabase.from('profiles').insert({
      user_id: data.user.id,
      full_name: fullName,
      avatar_url: '',
    });
  }
  
  return { data, error };
}

export async function signIn(email: string, password: string) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signOut() {
  return await supabase.auth.signOut();
}

export async function getSession() {
  return await supabase.auth.getSession();
}

export async function getUserProfile(userId: string) {
  return await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
} 