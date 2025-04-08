'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  let errorMessage = 'An error occurred';
  if (error === 'Configuration') {
    errorMessage = 'There is a problem with the server configuration.';
  } else if (error === 'AccessDenied') {
    errorMessage = 'You do not have access to this resource.';
  } else if (error === 'Verification') {
    errorMessage = 'The verification link is invalid or has expired.';
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">Error</h2>
          <p className="mt-2 text-center text-sm text-gray-400">{errorMessage}</p>
        </div>
        <div className="text-center">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-500"
          >
            Return to home
          </Link>
        </div>
      </div>
    </div>
  );
} 