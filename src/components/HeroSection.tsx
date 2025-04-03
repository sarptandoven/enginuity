'use client';

import { motion } from 'framer-motion';
import { FaRobot, FaCode, FaGraduationCap, FaLightbulb } from 'react-icons/fa6';
import dynamic from 'next/dynamic';

const WaitlistForm = dynamic(() => import('@/components/WaitlistForm'), {
  ssr: false,
});

interface FloatingElementProps {
  delay?: number;
  children: React.ReactNode;
}

const FloatingElement = ({ delay = 0, children }: FloatingElementProps) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ 
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }
    }}
  >
    {children}
  </motion.div>
);

const features = [
  {
    icon: <FaRobot size={32} />,
    title: "AI-Powered Learning",
    description: "Experience adaptive learning that evolves with your progress, powered by advanced AI algorithms."
  },
  {
    icon: <FaCode size={32} />,
    title: "Real-World Projects",
    description: "Build production-ready applications using the latest technologies and industry best practices."
  },
  {
    icon: <FaGraduationCap size={32} />,
    title: "Expert Guidance",
    description: "Learn from industry professionals and get personalized mentorship throughout your journey."
  },
  {
    icon: <FaLightbulb size={32} />,
    title: "Innovation Focus",
    description: "Stay ahead of the curve with cutting-edge tech and emerging industry trends."
  }
];

interface HeroSectionProps {
  parallax: number;
}

export default function HeroSection({ parallax }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <motion.div
        className="text-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          transform: `translateY(${parallax * 50}px)`
        }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Learn to Code Like a Pro
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          Join the future of coding education. Get personalized learning paths, 
          expert guidance, and hands-on projects tailored to your goals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            {
              title: "Personalized Learning",
              description: "AI-powered curriculum that adapts to your pace and style",
              icon: "🎯"
            },
            {
              title: "Expert Mentorship",
              description: "Learn from experienced developers who guide your journey",
              icon: "👨‍🏫"
            },
            {
              title: "Real Projects",
              description: "Build portfolio-worthy projects with modern technologies",
              icon: "💻"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              style={{
                transform: `translateY(${parallax * (30 + index * 10)}px)`
              }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 