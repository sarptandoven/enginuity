'use client';

import { createClient } from '@supabase/supabase-js';

// Define database types
export type WaitlistEntry = {
  id: string;
  email: string;
  created_at: string;
  status: 'pending' | 'approved' | 'rejected';
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
      persistSession: false,
      autoRefreshToken: true,
    },
    db: {
      schema: 'public',
    },
  }
); 