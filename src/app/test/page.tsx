'use client';

export default function TestPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold">Environment:</h2>
          <p>{process.env.NODE_ENV}</p>
        </div>
      </div>
    </div>
  );
} 