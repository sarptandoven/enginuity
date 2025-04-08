'use client';

import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [envVars, setEnvVars] = useState<{[key: string]: string}>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setEnvVars({
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'not set',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'set (hidden)' : 'not set',
      NODE_ENV: process.env.NODE_ENV || 'not set',
      basePath: window.location.pathname,
      origin: window.location.origin,
    });
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Debug</h1>
      <div className="space-y-4">
        {Object.entries(envVars).map(([key, value]) => (
          <div key={key} className="border p-4 rounded">
            <h2 className="font-semibold">{key}:</h2>
            <p className="font-mono">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 