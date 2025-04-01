'use client';

import { motion } from 'framer-motion';
import { FaRobot, FaCode, FaGraduationCap, FaLightbulb } from 'react-icons/fa6';
import dynamic from 'next/dynamic';

const WaitlistForm = dynamic(() => import('@/components/WaitlistForm'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0B]" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="container max-w-6xl mx-auto z-10">
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
              <div className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Enginuity
              </div>
              <div className="text-xl md:text-2xl mt-4 text-gray-400">
                AI-Powered Personalized Learning Paths
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12"
            >
              Join the future of coding education. Get personalized learning paths, 
              expert guidance, and hands-on projects tailored to your goals.
            </motion.div>

            <WaitlistForm />
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-20"
          >
            {[
              {
                icon: <FaRobot size={32} />,
                title: "AI-Powered Learning",
                description: "Get a personalized curriculum that adapts to your learning style and pace."
              },
              {
                icon: <FaCode size={32} />,
                title: "Real-World Projects",
                description: "Work on practical projects that matter in today's tech landscape."
              },
              {
                icon: <FaGraduationCap size={32} />,
                title: "Expert Guidance",
                description: "Learn from industry professionals and AI assistants."
              },
              {
                icon: <FaLightbulb size={32} />,
                title: "Innovation Focus",
                description: "Stay ahead with cutting-edge technologies and best practices."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="group relative p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 
                          hover:border-gray-700 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-500/10 
                                text-blue-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-100">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
} 