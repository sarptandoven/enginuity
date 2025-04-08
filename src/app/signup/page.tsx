'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import { 
  InputField, 
  SubmitButton, 
  StatusMessage, 
  AuthFormWrapper, 
  AuthToggleLink,
  FormStatus 
} from '@/components/ui/AuthForms';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa6';
import { motion } from 'framer-motion';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
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
      if (!fullName || !email || !password) {
        setStatus('error');
        setMessage('Please fill in all fields');
        return;
      }
      
      if (password.length < 6) {
        setStatus('error');
        setMessage('Password must be at least 6 characters');
        return;
      }
      
      // Attempt to sign up
      const { data, error } = await signUp(email, password, fullName);
      
      if (error) {
        console.error('Signup error:', error);
        setStatus('error');
        setMessage(error.message || 'Failed to create account. Please try again.');
        return;
      }
      
      // Success - update auth context and redirect
      await refreshUser();
      setStatus('success');
      setMessage('Account created successfully! Redirecting...');
      
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
      <div className="w-full max-w-md px-4">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Join Engiunity
          </h1>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-gray-400 text-center mb-8">
            Create your account to get started
          </p>
        </motion.div>
        
        <AuthFormWrapper>
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              icon={<FaUser className="text-gray-400" />}
              id="fullName"
              name="fullName"
            />
            
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
              placeholder="Choose a password"
              icon={<FaLock className="text-gray-400" />}
              id="password"
              name="password"
            />
            
            <div className="mt-6">
              <SubmitButton
                text="Create Account"
                isLoading={status === 'loading'}
                isDisabled={!fullName || !email || !password}
              />
            </div>
            
            <StatusMessage message={message} status={status} />
          </form>
        </AuthFormWrapper>
        
        <AuthToggleLink isLogin={false} />
      </div>
    </div>
  );
} 