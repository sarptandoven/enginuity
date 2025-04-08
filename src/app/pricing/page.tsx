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
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Choose Your Learning Path
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Flexible pricing options to fit your learning needs and budget.
              All plans include access to our revolutionary AI-powered platform.
            </p>
          </motion.div>
        </div>
        
        <PricingToggle isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <PricingTier 
              key={index}
              tier={tier}
              isAnnual={isAnnual}
              isPopular={tier.isPopular}
              index={index}
              user={user}
            />
          ))}
        </div>
        
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need a custom solution for your team or organization?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            We offer tailored enterprise plans for teams of all sizes. Get in touch with us to discuss
            your specific needs and how we can help your team level up their coding skills.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all">
            Contact Sales
          </button>
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
            {[
              {
                question: "Can I switch plans later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, you'll receive credit towards your next billing cycle."
              },
              {
                question: "Is there a free trial?",
                answer: "We offer a 7-day free trial on all plans. No credit card required until you decide to continue with a paid subscription."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and Apple Pay. For enterprise plans, we can also accommodate wire transfers and purchase orders."
              },
              {
                question: "Can I cancel anytime?",
                answer: "Absolutely! You can cancel your subscription at any time. You'll continue to have access until the end of your current billing period."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-900/30 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 