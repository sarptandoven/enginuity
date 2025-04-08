'use client';

import Link from 'next/link';
import { FaTwitter, FaLinkedin, FaGithub, FaDiscord } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company info */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Engiunity
            </h3>
            <p className="text-gray-400 mb-6">
              Revolutionizing coding education through AI-powered personalized learning.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Discord"
              >
                <FaDiscord size={20} />
              </a>
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Platform</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/features" className="hover:text-blue-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-blue-400 transition-colors">
                  Live Demo
                </Link>
              </li>
              <li>
                <Link href="/curriculum" className="hover:text-blue-400 transition-colors">
                  Curriculum
                </Link>
              </li>
              <li>
                <Link href="/mentorship" className="hover:text-blue-400 transition-colors">
                  Mentorship
                </Link>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-blue-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/terms" className="hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-blue-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Engiunity. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 