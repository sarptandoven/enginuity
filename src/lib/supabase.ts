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

// Hardcoded fallback values for development and testing
// These will be overridden by environment variables when available
const FALLBACK_URL = 'https://xyzcompany.supabase.co';
const FALLBACK_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdXZ3eHd4d3h3eHgiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxODAwMDAwMDAwfQ.fallback-key-for-build';

// Function to get environment variables with fallbacks
function getSupabaseConfig() {
  // Check if we're in the browser
  if (typeof window !== 'undefined') {
    // Try to get from window.__NEXT_DATA__.props.pageProps
    try {
      const nextData = (window as any).__NEXT_DATA__;
      if (nextData?.props?.pageProps?.env) {
        const env = nextData.props.pageProps.env;
        if (env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          return {
            supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
            supabaseAnonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          };
        }
      }
    } catch (e) {
      console.warn('Failed to get Supabase config from __NEXT_DATA__');
    }
  }

  // Try to get from process.env
  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (envUrl && envKey) {
    return { supabaseUrl: envUrl, supabaseAnonKey: envKey };
  }

  // Use fallbacks as last resort
  return {
    supabaseUrl: FALLBACK_URL,
    supabaseAnonKey: FALLBACK_ANON_KEY
  };
}

// Get the configuration
const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();

// Initialize the Supabase client
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'supabase.auth.token',
    },
    db: {
      schema: 'public',
    },
  }
);

// Log configuration status (but not the actual values)
if (typeof window !== 'undefined') {
  console.log('Supabase Configuration Status:', {
    url: supabaseUrl ? 'Set' : 'Not Set',
    key: supabaseAnonKey ? 'Set' : 'Not Set',
    source: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Environment' : 'Fallback'
  });
}

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