'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';

const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // TODO: Implement actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setMessage('Thanks for joining! We\'ll be in touch soon.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            required
            className="flex-1 px-6 py-4 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 
                     text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50
                     transition-all duration-300 hover:border-blue-500/50"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-semibold
                     hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {status === 'loading' ? (
              <div
                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"
              />
            ) : (
              'Join Waitlist'
            )}
          </button>
        </div>

        {message && (
          <p
            className={`mt-4 text-center ${
              status === 'success' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {message}
          </p>
        )}

        <div
          className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0
                    group-hover:opacity-100 blur-xl transition-opacity duration-300"
          style={{ zIndex: -1 }}
        />
      </form>
    </div>
  );
};

export default WaitlistForm; 