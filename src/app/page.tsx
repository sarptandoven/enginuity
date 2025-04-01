'use client';

import { motion } from 'framer-motion';
import { FaRobot, FaCode, FaGraduationCap, FaLightbulb } from 'react-icons/fa6';
import dynamic from 'next/dynamic';

const WaitlistForm = dynamic(() => import('@/components/WaitlistForm'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-gradient" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        </div>
        
        <div className="container mx-auto px-4 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Welcome to Enginuity
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Revolutionizing coding education with AI-powered personalized learning paths
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a href="#waitlist" className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-lg hover:scale-105 transition-transform duration-200 shadow-lg">
              Join the Waitlist
            </a>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="animate-bounce">
            <a href="#features" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaRobot className="w-8 h-8 text-blue-400" />,
                title: "AI-Powered Learning",
                description: "Personalized curriculum that adapts to your learning style and pace"
              },
              {
                icon: <FaCode className="w-8 h-8 text-purple-400" />,
                title: "Real-World Projects",
                description: "Work on practical projects that matter in today's tech landscape"
              },
              {
                icon: <FaGraduationCap className="w-8 h-8 text-green-400" />,
                title: "Expert Guidance",
                description: "Get mentored by industry professionals and AI assistants"
              },
              {
                icon: <FaLightbulb className="w-8 h-8 text-yellow-400" />,
                title: "Innovation Focus",
                description: "Learn cutting-edge technologies and best practices"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-colors duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold">How It Works</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Sign Up",
                description: "Join our platform and tell us about your goals and experience"
              },
              {
                step: "02",
                title: "Get Your Path",
                description: "Receive a personalized learning journey crafted by our AI"
              },
              {
                step: "03",
                title: "Start Learning",
                description: "Begin your journey with hands-on projects and expert guidance"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-blue-500 mb-4">{step.step}</div>
                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Join the Waitlist</h2>
            <p className="text-gray-400 mb-8">
              Be among the first to experience the future of coding education.
              Get early access and exclusive benefits.
            </p>
            <WaitlistForm />
          </motion.div>
        </div>
      </section>
    </main>
  );
} 