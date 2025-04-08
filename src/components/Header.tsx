'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaUser, FaBars, FaXmark } from 'react-icons/fa6';
import { useAuth } from '@/lib/auth-context';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut, loading } = useAuth();

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Live Demo', path: '/demo' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Engiunity
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm transition-colors duration-300 ${
                  isActive(link.path)
                    ? 'text-white font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!loading && (
              <>
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center space-x-2 text-white bg-gray-800 hover:bg-gray-700 py-2 px-4 rounded-lg transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        <FaUser />
                      </div>
                      <span className="text-sm font-medium">Account</span>
                    </button>

                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden z-50"
                      >
                        <div className="p-2 border-b border-gray-800">
                          <p className="text-sm text-gray-400">Signed in as</p>
                          <p className="text-sm font-medium text-white truncate">
                            {user.email}
                          </p>
                        </div>
                        <div className="py-1">
                          <Link
                            href="/dashboard"
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            Dashboard
                          </Link>
                          <Link
                            href="/profile"
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            Profile
                          </Link>
                          <button
                            onClick={() => {
                              signOut();
                              setUserMenuOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800"
                          >
                            Sign out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-gray-900 border-t border-gray-800"
        >
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block py-2 px-3 rounded-lg ${
                  isActive(link.path)
                    ? 'bg-blue-900/30 text-white font-medium'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block py-2 px-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="block py-2 px-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left py-2 px-3 text-red-400 hover:bg-gray-800 rounded-lg"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block py-2 px-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      className="block py-2 px-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
} 