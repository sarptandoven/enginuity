'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaPenToSquare,
  FaCheck,
  FaTriangleExclamation,
} from 'react-icons/fa6';
import { InputField, SubmitButton, StatusMessage, FormStatus } from '@/components/ui/AuthForms';

export default function ProfilePage() {
  const { user, profile, loading, refreshUser } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  // Profile form state
  const [fullName, setFullName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMounted(true);
    
    // Initialize form with user data when loaded
    if (profile?.full_name) {
      setFullName(profile.full_name);
    }
  }, [profile]);

  // Redirect if not authenticated
  useEffect(() => {
    if (mounted && !loading && !user) {
      router.push('/login');
    }
  }, [mounted, loading, user, router]);

  // Show loading state or redirect to login if not authenticated
  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      setStatus('loading');
      setMessage('');
      
      if (!fullName.trim()) {
        setStatus('error');
        setMessage('Name cannot be empty');
        return;
      }
      
      // Update profile in database
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);
      
      if (error) {
        throw error;
      }
      
      // Refresh user data in context
      await refreshUser();
      
      setStatus('success');
      setMessage('Profile updated successfully');
      setIsEditing(false);
      
    } catch (error) {
      console.error('Error updating profile:', error);
      setStatus('error');
      setMessage('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
          <p className="text-gray-400">Manage your account information</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden"
        >
          <div className="p-8">
            <div className="flex flex-col sm:flex-row items-center mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl mb-4 sm:mb-0 sm:mr-6">
                <FaUser />
              </div>
              
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold">{profile?.full_name || 'User'}</h2>
                <p className="text-gray-400 flex items-center justify-center sm:justify-start mt-1">
                  <FaEnvelope className="mr-2" /> {user.email}
                </p>
              </div>
              
              {!isEditing && (
                <button 
                  className="sm:ml-auto mt-4 sm:mt-0 flex items-center px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors"
                  onClick={() => setIsEditing(true)}
                >
                  <FaPenToSquare className="mr-2" /> Edit Profile
                </button>
              )}
            </div>
            
            {isEditing ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <InputField
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  icon={<FaUser className="text-gray-400" />}
                  id="fullName"
                  name="fullName"
                />
                
                <div className="mt-6 flex space-x-4">
                  <button 
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFullName(profile?.full_name || '');
                      setStatus('idle');
                      setMessage('');
                    }}
                    className="flex-1 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  
                  <div className="flex-1">
                    <SubmitButton
                      text="Save Changes"
                      isLoading={status === 'loading'}
                      isDisabled={!fullName || fullName === profile?.full_name}
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <StatusMessage message={message} status={status} />
                </div>
              </form>
            ) : (
              <div>
                <div className="border-t border-gray-800 pt-6 mt-6">
                  <h3 className="text-xl font-semibold mb-4">Account Information</h3>
                  
                  <div className="space-y-4 text-gray-300">
                    <p>
                      <span className="text-gray-500 inline-block w-32">Full Name:</span> 
                      {profile?.full_name || 'Not set'}
                    </p>
                    <p>
                      <span className="text-gray-500 inline-block w-32">Email:</span> 
                      {user.email}
                    </p>
                    <p>
                      <span className="text-gray-500 inline-block w-32">Member Since:</span> 
                      {new Date(user.created_at || '').toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-800 pt-6 mt-6">
                  <h3 className="text-xl font-semibold mb-4">Account Actions</h3>
                  
                  <div className="space-y-3">
                    <button className="text-gray-400 hover:text-blue-400 transition-colors">
                      Change Password
                    </button>
                    <button className="block text-red-400 hover:text-red-300 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 