'use client';

import { createContext, useContext, ReactNode } from 'react';

interface SupabaseConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

const ConfigContext = createContext<SupabaseConfig | null>(null);

export function useConfig() {
  const config = useContext(ConfigContext);
  if (!config) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return config;
}

export function ConfigProvider({ children }: { children: ReactNode }) {
  const config = {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  };

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
} 