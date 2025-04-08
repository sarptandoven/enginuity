'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { motion } from 'framer-motion';
import { FaBookOpen, FaCode, FaChartLine, FaUserGraduate, FaLock } from 'react-icons/fa6';

export default function DashboardPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Course/project data - this could come from an API in a real application
  const courses = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      progress: 75,
      nextLesson: 'CSS Flexbox & Grid',
      image: '/images/courses/web-dev.jpg',
    },
    {
      id: 2,
      title: 'JavaScript Fundamentals',
      progress: 40,
      nextLesson: 'Working with Arrays',
      image: '/images/courses/javascript.jpg',
    },
    {
      id: 3,
      title: 'React Essentials',
      progress: 10,
      nextLesson: 'Components & Props',
      image: '/images/courses/react.jpg',
    },
  ];

  // Function to format the user's name - show first name or full name based on formatting
  const getUserName = () => {
    if (!profile?.full_name) return user.email?.split('@')[0] || 'User';
    
    const nameParts = profile.full_name.split(' ');
    return nameParts[0]; // Return just the first name
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2">Welcome, {getUserName()}</h1>
            <p className="text-gray-400">Here's an overview of your learning journey</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 sm:mt-0"
          >
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all">
              Continue Learning
            </button>
          </motion.div>
        </div>
        
        {/* Stats overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {[
            { label: 'Courses Enrolled', value: '3', icon: <FaBookOpen /> },
            { label: 'Projects Completed', value: '7', icon: <FaCode /> },
            { label: 'Learning Hours', value: '48', icon: <FaChartLine /> },
            { label: 'Mentor Sessions', value: '5', icon: <FaUserGraduate /> },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="text-blue-400 text-2xl mb-3">{stat.icon}</div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </motion.div>
        
        {/* Courses in progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6">Your Courses</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden hover:border-blue-500/30 transition-all group"
              >
                <div className="h-40 bg-gradient-to-r from-blue-900/50 to-purple-900/50 flex items-center justify-center relative">
                  {/* If we had actual images, they would go here */}
                  <div className="text-4xl text-blue-400">{index === 0 ? <FaCode /> : index === 1 ? <FaBookOpen /> : <FaChartLine />}</div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    <span className="font-medium">{course.progress}%</span> completed
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Next: {course.nextLesson}
                  </p>
                  <button className="w-full py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors">
                    Resume Course
                  </button>
                </div>
              </motion.div>
            ))}
            
            {/* Locked course preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-10">
                <FaLock className="text-4xl text-gray-500 mb-3" />
                <p className="text-gray-400 text-center px-6">
                  Unlock advanced courses by completing your current ones
                </p>
                <button className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500/50 to-purple-600/50 rounded-lg text-white font-medium hover:from-blue-500 hover:to-purple-600 transition-all">
                  Upgrade Plan
                </button>
              </div>
              
              <div className="h-40 bg-gradient-to-r from-gray-900/80 to-gray-900/80" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Advanced Machine Learning</h3>
                <p className="text-gray-400 mb-4">
                  <span className="font-medium">0%</span> completed
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  First: Introduction to Neural Networks
                </p>
                <button className="w-full py-2 bg-gray-800 text-gray-400 rounded-lg cursor-not-allowed">
                  Start Course
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 