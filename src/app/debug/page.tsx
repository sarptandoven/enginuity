'use client';

import { useEffect, useState } from 'react';

export default function DebugPage() {
  const env = {
    NODE_ENV: process.env.NODE_ENV || 'not set',
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Debug Information</h1>
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold">Environment Variables:</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(env, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
} 