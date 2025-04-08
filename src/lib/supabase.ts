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

// Initialize Supabase client with runtime check for environment variables
function createSupabaseClient() {
  // Get environment variables
  const supabaseUrl = typeof window !== 'undefined' 
    ? window.ENV?.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL 
    : process.env.NEXT_PUBLIC_SUPABASE_URL;
  
  const supabaseAnonKey = typeof window !== 'undefined'
    ? window.ENV?.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is required. Make sure it is set in your environment variables.');
  }

  if (!supabaseAnonKey) {
    throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is required. Make sure it is set in your environment variables.');
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });
}

// Singleton pattern with lazy initialization
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseClient() {
  if (typeof window === 'undefined') {
    throw new Error('Supabase client cannot be used server-side. Use Server Components or API Routes for server-side operations.');
  }

  if (!supabaseInstance) {
    supabaseInstance = createSupabaseClient();
  }

  return supabaseInstance;
}

// Helper functions for authentication
export async function signUp(email: string, password: string, fullName: string) {
  const supabase = getSupabaseClient();
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
    await supabase.from('profiles').insert({
      user_id: data.user.id,
      full_name: fullName,
      avatar_url: '',
    });
  }
  
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const supabase = getSupabaseClient();
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signOut() {
  const supabase = getSupabaseClient();
  return await supabase.auth.signOut();
}

export async function getSession() {
  const supabase = getSupabaseClient();
  return await supabase.auth.getSession();
}

export async function getUserProfile(userId: string) {
  const supabase = getSupabaseClient();
  return await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
}

// Log configuration status (but not the actual values)
if (typeof window !== 'undefined') {
  console.log('Supabase Configuration Status:', {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not Set',
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not Set',
    source: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Environment' : 'Fallback'
  });
} 