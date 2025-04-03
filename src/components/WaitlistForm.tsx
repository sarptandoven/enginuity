'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaCheck, FaTriangleExclamation } from 'react-icons/fa6';
import { supabase } from '@/lib/supabase';

const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email, signed_up_at: new Date().toISOString() }]);

      if (error) throw error;

      setStatus('success');
      setMessage('Thanks for joining! We\'ll be in touch soon.');
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <form onSubmit={handleSubmit} className="relative glass p-6 rounded-2xl">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaEnvelope className="text-gray-400" />
            </div>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
              className="w-full pl-12 pr-4 py-4 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50
                       transition-all duration-300 hover:border-blue-500/50"
            />
          </div>
          
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-semibold
                     hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
                     flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <motion.div
                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              'Join Waitlist'
            )}
          </button>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
              status === 'success' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
            }`}
          >
            {status === 'success' ? (
              <FaCheck className="text-green-400" />
            ) : (
              <FaTriangleExclamation className="text-red-400" />
            )}
            <p>{message}</p>
          </motion.div>
        )}

        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0
                    group-hover:opacity-100 blur-xl transition-opacity duration-300"
          style={{ zIndex: -1 }}
          animate={{
            opacity: [0, 0.15, 0],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </form>
    </motion.div>
  );
};

export default WaitlistForm; 