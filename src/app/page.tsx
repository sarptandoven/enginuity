'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaRobot, FaCode, FaGraduationCap, FaLightbulb } from 'react-icons/fa6';
import { useRef } from 'react';
import dynamic from 'next/dynamic';

const WaitlistForm = dynamic(() => import('@/components/WaitlistForm'), {
  ssr: false,
});

const FloatingElement = ({ delay = 0, children }: { delay?: number; children: React.ReactNode }) => (
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

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white overflow-hidden" ref={containerRef}>
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent animate-pulse" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0B]"
          style={{ opacity }}
        />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
              initial={{ 
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%"
              }}
              animate={{
                x: [
                  Math.random() * 100 + "%",
                  Math.random() * 100 + "%",
                  Math.random() * 100 + "%"
                ],
                y: [
                  Math.random() * 100 + "%",
                  Math.random() * 100 + "%",
                  Math.random() * 100 + "%"
                ]
              }}
              transition={{
                duration: Math.random() * 10 + 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <motion.div 
          className="container max-w-6xl mx-auto z-10"
          style={{ scale }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6"
            >
              <FloatingElement>
                <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
                  Enginuity
                </h1>
              </FloatingElement>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-2xl md:text-3xl text-gray-400 font-light">
                  AI-Powered Personalized Learning Paths
                </p>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Join the future of coding education. Get personalized learning paths, 
              expert guidance, and hands-on projects tailored to your goals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <WaitlistForm />
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20"
          >
            {[
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
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="group relative p-8 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 
                          hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <motion.div 
                    className="w-16 h-16 flex items-center justify-center rounded-xl bg-blue-500/10 
                              text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-100">{feature.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
} 