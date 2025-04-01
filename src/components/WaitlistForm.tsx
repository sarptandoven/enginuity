'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with error handling
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseKey
  });
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

export default function WaitlistForm() {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!supabaseUrl || !supabaseKey) {
      setStatus('error');
      setMessage('Configuration error. Please try again later.');
      return;
    }

    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      // Check if email already exists
      const { data: existingEmails, error: checkError } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', email)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking email:', checkError);
        throw checkError;
      }

      if (existingEmails) {
        setStatus('error');
        setMessage('This email is already on the waitlist');
        return;
      }

      // Insert new email
      const { error: insertError } = await supabase
        .from('waitlist')
        .insert([{ email }]);

      if (insertError) {
        console.error('Error inserting email:', insertError);
        throw insertError;
      }

      setStatus('success');
      setMessage('You have been added to the waitlist!');
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (status !== 'idle') {
      setStatus('idle');
      setMessage('');
    }
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
      >
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 bg-gray-900/50 backdrop-blur-sm rounded-xl 
                     border border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                     outline-none transition-all duration-200 text-white placeholder-gray-400"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-200
                     ${status === 'loading' 
                       ? 'bg-gray-700 cursor-not-allowed'
                       : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25'
                     }`}
          >
            {status === 'loading' ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
            ) : (
              'Join Waitlist'
            )}
          </button>
        </form>
      </motion.div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`absolute left-0 right-0 text-center mt-4
                     ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}
        >
          {message}
        </motion.div>
      )}
    </div>
  );
} 