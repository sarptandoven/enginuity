'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaEnvelope, FaLock, FaUser, FaCheck, FaTriangleExclamation } from 'react-icons/fa6';

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface InputFieldProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: React.ReactNode;
  required?: boolean;
  id?: string;
  name?: string;
}

export const InputField = ({
  type,
  value,
  onChange,
  placeholder,
  icon,
  required = true,
  id,
  name,
}: InputFieldProps) => (
  <div className="relative mb-4">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      {icon}
    </div>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full pl-12 pr-4 py-4 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 
                text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50
                transition-all duration-300 hover:border-blue-500/50"
    />
  </div>
);

interface SubmitButtonProps {
  text: string;
  isLoading: boolean;
  isDisabled: boolean;
}

export const SubmitButton = ({ text, isLoading, isDisabled }: SubmitButtonProps) => (
  <button
    type="submit"
    disabled={isLoading || isDisabled}
    className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-semibold
            hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50
            disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
            flex items-center justify-center gap-2"
  >
    {isLoading ? (
      <motion.div
        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    ) : (
      text
    )}
  </button>
);

interface StatusMessageProps {
  message: string;
  status: FormStatus;
}

export const StatusMessage = ({ message, status }: StatusMessageProps) => {
  if (!message) return null;
  
  return (
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
  );
};

interface AuthFormWrapperProps {
  children: React.ReactNode;
}

export const AuthFormWrapper = ({ children }: AuthFormWrapperProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="w-full max-w-md mx-auto bg-gray-900/80 p-8 rounded-2xl border border-gray-800"
  >
    {children}
    
    <motion.div
      className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0
                blur-xl transition-opacity duration-300"
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
  </motion.div>
);

export const AuthToggleLink = ({ isLogin }: { isLogin: boolean }) => (
  <div className="text-center mt-6 text-gray-400">
    {isLogin ? (
      <>
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-blue-400 hover:text-blue-300 transition-colors">
          Sign Up
        </Link>
      </>
    ) : (
      <>
        Already have an account?{' '}
        <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
          Log In
        </Link>
      </>
    )}
  </div>
); 