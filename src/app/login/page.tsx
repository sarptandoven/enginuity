'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { signIn } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { 
  InputField, 
  SubmitButton, 
  StatusMessage, 
  AuthFormWrapper, 
  AuthToggleLink,
  FormStatus 
} from '@/components/ui/AuthForms';
import { FaEnvelope, FaLock } from 'react-icons/fa6';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { refreshUser } = useAuth();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    try {
      setStatus('loading');
      setMessage('');
      
      // Validate inputs
      if (!email || !password) {
        setStatus('error');
        setMessage('Please fill in all fields');
        return;
      }
      
      // Attempt to sign in
      const { data, error } = await signIn(email, password);
      
      if (error) {
        console.error('Login error:', error);
        setStatus('error');
        setMessage(error.message || 'Failed to log in. Please check your credentials.');
        return;
      }
      
      // Success - update auth context and redirect
      await refreshUser();
      setStatus('success');
      setMessage('Login successful! Redirecting...');
      
      // Short delay for better UX
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
      
    } catch (error) {
      console.error('Unexpected error:', error);
      setStatus('error');
      setMessage('An unexpected error occurred. Please try again.');
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center">
      <Head>
        <title>Login | Engiunity</title>
      </Head>
      
      <div className="w-full max-w-md px-4">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Welcome Back
          </h1>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-gray-400 text-center mb-8">
            Log in to your Engiunity account
          </p>
        </motion.div>
        
        <AuthFormWrapper>
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              icon={<FaEnvelope className="text-gray-400" />}
              id="email"
              name="email"
            />
            
            <InputField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              icon={<FaLock className="text-gray-400" />}
              id="password"
              name="password"
            />
            
            <div className="mt-6">
              <SubmitButton
                text="Log In"
                isLoading={status === 'loading'}
                isDisabled={!email || !password}
              />
            </div>
            
            <StatusMessage message={message} status={status} />
          </form>
        </AuthFormWrapper>
        
        <AuthToggleLink isLogin={true} />
      </div>
    </div>
  );
} 