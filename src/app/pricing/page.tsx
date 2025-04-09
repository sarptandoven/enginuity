'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCircleCheck, FaChevronRight } from 'react-icons/fa6';
import { useAuth } from '@/lib/auth-context';
import { User } from '@supabase/supabase-js';

interface PricingTierData {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  isPopular?: boolean;
}

interface PricingToggleProps {
  isAnnual: boolean;
  setIsAnnual: (isAnnual: boolean) => void;
}

interface PricingTierProps {
  tier: PricingTierData;
  isAnnual: boolean;
  isPopular?: boolean;
  index: number;
  user: User | null;
}

const PricingToggle = ({ isAnnual, setIsAnnual }: PricingToggleProps) => (
  <div className="flex justify-center items-center gap-4 mb-12">
    <span className={`text-lg ${!isAnnual ? 'text-white font-semibold' : 'text-gray-400'}`}>Monthly</span>
    
    <button
      onClick={() => setIsAnnual(!isAnnual)}
      className={`w-16 h-8 rounded-full flex items-center p-1 transition-colors ${
        isAnnual ? 'bg-blue-600' : 'bg-gray-700'
      }`}
    >
      <motion.div
        className="w-6 h-6 bg-white rounded-full shadow-md"
        animate={{ x: isAnnual ? 8 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
    
    <div className="flex items-center">
      <span className={`text-lg ${isAnnual ? 'text-white font-semibold' : 'text-gray-400'}`}>Annual</span>
      <span className="ml-2 bg-green-600/20 text-green-400 text-xs px-2 py-1 rounded">Save 20%</span>
    </div>
  </div>
);

const PricingTier = ({ tier, isAnnual, isPopular, index, user }: PricingTierProps) => {
  const features = tier.features;
  const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
  const originalPrice = isAnnual ? tier.annualPrice * 1.2 : tier.monthlyPrice;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bg-gray-900/80 backdrop-blur-sm rounded-2xl border ${
        isPopular 
          ? 'border-blue-500/50 shadow-lg shadow-blue-500/10' 
          : 'border-gray-800'
      } overflow-hidden relative`}
    >
      {isPopular && (
        <div className="absolute top-0 right-0">
          <div className="bg-blue-600 text-xs text-white font-semibold px-4 py-1 rounded-bl-lg">
            Most Popular
          </div>
        </div>
      )}
      
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
        <p className="text-gray-400 h-12 mb-6">{tier.description}</p>
        
        <div className="mb-6">
          <div className="flex items-end">
            <span className="text-4xl font-bold">${price}</span>
            <span className="text-gray-400 ml-2">/ {isAnnual ? 'year' : 'month'}</span>
          </div>
          {isAnnual && (
            <div className="text-sm text-gray-400 mt-1 flex items-center">
              <span className="line-through">${originalPrice.toFixed(0)}</span>
              <span className="ml-2 text-green-400">Save ${(originalPrice - price).toFixed(0)}</span>
            </div>
          )}
        </div>
        
        <Link 
          href={user ? '/dashboard' : '/signup'}
          className={`block w-full py-3 text-center rounded-lg font-semibold mb-8 ${
            isPopular 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700' 
              : 'bg-gray-800 text-white hover:bg-gray-700'
          } transition-all`}
        >
          {user ? 'Go to Dashboard' : 'Get Started'} {isPopular && <FaChevronRight className="inline ml-1" />}
        </Link>
        
        <div>
          <p className="font-semibold mb-4">What's included:</p>
          <ul className="space-y-3">
            {features.map((feature: string, i: number) => (
              <li key={i} className="flex items-start">
                <FaCircleCheck className="text-blue-400 mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const { user } = useAuth();
  
  const pricingTiers: PricingTierData[] = [
    {
      name: "Basic",
      description: "Perfect for beginners starting their coding journey",
      monthlyPrice: 19,
      annualPrice: 15,
      features: [
        "Access to 50+ beginner courses",
        "Basic coding challenges",
        "Community forum access",
        "Email support within 48 hours",
        "Progress tracking",
      ],
    },
    {
      name: "Pro",
      description: "The ideal choice for serious learners",
      monthlyPrice: 49,
      annualPrice: 39,
      features: [
        "Everything in Basic",
        "Access to all 200+ courses",
        "Advanced coding challenges",
        "AI code reviews (10/month)",
        "Priority email support (24 hours)",
        "1 monthly video call with a mentor",
        "Team collaboration tools",
      ],
      isPopular: true,
    },
    {
      name: "Ultimate",
      description: "For those who want to master coding fast",
      monthlyPrice: 99,
      annualPrice: 79,
      features: [
        "Everything in Pro",
        "Unlimited AI code reviews",
        "Weekly 1-on-1 mentorship calls",
        "Direct Slack access to instructors",
        "Custom learning path",
        "Career coaching sessions",
        "Job placement assistance",
        "Certificate of completion",
      ],
    }
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pricing</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Free Tier */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Free</h2>
          <p className="text-gray-600 mb-4">Perfect for getting started</p>
          <div className="text-3xl font-bold mb-4">$0</div>
          <ul className="space-y-2">
            <li>✓ Basic features</li>
            <li>✓ Community support</li>
            <li>✓ 1GB storage</li>
          </ul>
        </div>

        {/* Pro Tier */}
        <div className="border rounded-lg p-6 bg-blue-50">
          <h2 className="text-xl font-semibold mb-4">Pro</h2>
          <p className="text-gray-600 mb-4">For growing businesses</p>
          <div className="text-3xl font-bold mb-4">$29/mo</div>
          <ul className="space-y-2">
            <li>✓ All Free features</li>
            <li>✓ Priority support</li>
            <li>✓ 10GB storage</li>
            <li>✓ Advanced analytics</li>
          </ul>
        </div>

        {/* Enterprise Tier */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Enterprise</h2>
          <p className="text-gray-600 mb-4">For large organizations</p>
          <div className="text-3xl font-bold mb-4">Custom</div>
          <ul className="space-y-2">
            <li>✓ All Pro features</li>
            <li>✓ 24/7 support</li>
            <li>✓ Unlimited storage</li>
            <li>✓ Custom integrations</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 