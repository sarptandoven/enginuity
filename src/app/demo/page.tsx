'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaPlay, 
  FaCode, 
  FaCircleCheck, 
  FaLock,
  FaChevronRight, 
  FaRobot,
  FaBookOpen,
  FaUserGraduate
} from 'react-icons/fa6';
import { useAuth } from '@/lib/auth-context';

// Dynamically import 3D component with no SSR
const Hero3D = dynamic(() => import('@/components/Hero3D'), { ssr: false });

// Code demonstration component
const CodeDemo = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [codeComplete, setCodeComplete] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);
  const typingTimer = useRef<NodeJS.Timeout | null>(null);
  
  const demoCode = [
    `function calculateFactorial(n) {
  // Base case
  if (n === 0 || n === 1) {
    return 1;
  }
  
  // Recursive case
  return n * calculateFactorial(n - 1);
}

// Calculate factorial of 5
const result = calculateFactorial(5);
console.log(result); // 120`,
    `async function fetchUserData(userId) {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}`,
    `class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  
  insert(value) {
    const newNode = { value, left: null, right: null };
    
    if (!this.root) {
      this.root = newNode;
      return;
    }
    
    let current = this.root;
    
    while (true) {
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }
}`
  ];
  
  // Display code with syntax highlighting and typing animation
  useEffect(() => {
    if (activeTab !== null) {
      setCodeComplete(false);
      setTypingIndex(0);
      
      if (typingTimer.current) {
        clearInterval(typingTimer.current);
      }
      
      typingTimer.current = setInterval(() => {
        setTypingIndex(prev => {
          if (prev >= demoCode[activeTab].length) {
            clearInterval(typingTimer.current!);
            setCodeComplete(true);
            return prev;
          }
          return prev + 1;
        });
      }, 10); // Adjust speed as needed
    }
    
    return () => {
      if (typingTimer.current) {
        clearInterval(typingTimer.current);
      }
    };
  }, [activeTab]);
  
  // Prepare code for display with typing effect
  const displayCode = demoCode[activeTab]?.substring(0, typingIndex) || '';
  
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
      <div className="flex border-b border-gray-800">
        {['Recursion', 'Async/Await', 'Data Structures'].map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-3 text-sm font-medium flex-1 ${
              activeTab === index 
                ? 'bg-blue-900/20 text-blue-400 border-b-2 border-blue-500' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className="p-4">
        <div className="font-mono text-sm bg-gray-950 p-4 rounded-lg overflow-auto max-h-80">
          <pre className="text-gray-300">{displayCode}</pre>
          {codeComplete && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-3 bg-green-900/20 text-green-400 rounded flex items-center"
            >
              <FaCircleCheck className="mr-2" />
              Code executed successfully! This is just one example of what you'll learn.
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

// Interactive lesson component
const InteractiveLesson = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });
  
  const lessonSteps = [
    {
      title: "Welcome to JavaScript Functions",
      content: "In this lesson, we'll learn about JavaScript functions and how they help organize your code.",
      icon: <FaBookOpen />
    },
    {
      title: "Understanding Function Syntax",
      content: "Functions are defined with the function keyword, followed by a name and parentheses for parameters.",
      icon: <FaCode />
    },
    {
      title: "Working with Parameters",
      content: "Parameters allow us to pass data into functions, making them more flexible and reusable.",
      icon: <FaRobot />
    },
    {
      title: "Practicing with Code Challenges",
      content: "Let's solidify our knowledge by completing a few hands-on coding exercises together.",
      icon: <FaUserGraduate />
    }
  ];
  
  const handleNext = () => {
    if (currentStep < lessonSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-blue-900/30 text-blue-400 rounded-full flex items-center justify-center text-xl">
            {lessonSteps[currentStep].icon}
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold">{lessonSteps[currentStep].title}</h3>
            <div className="flex mt-1">
              {lessonSteps.map((_, index) => (
                <div 
                  key={index} 
                  className={`w-8 h-1 rounded mr-1 ${
                    index === currentStep ? 'bg-blue-500' : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <p className="text-gray-300 mb-8">
          {lessonSteps[currentStep].content}
        </p>
        
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentStep === lessonSteps.length - 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function DemoPage() {
  const { user } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  
  const { ref: featuresRef, inView: featuresInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Hero3D />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/90 z-10" />
        
        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Experience Engiunity Live
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto">
              Take our platform for a test drive and see why we're 
              revolutionizing how coding is taught and learned.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <button 
              onClick={() => setShowLoginPrompt(!user)}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold
                      hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105
                      flex items-center"
            >
              <FaPlay className="mr-2" /> 
              Start Interactive Demo
            </button>
            
            <Link 
              href="/pricing"
              className="px-8 py-4 bg-gray-800/80 text-white rounded-xl font-medium
                     hover:bg-gray-700 transition-all"
            >
              See Pricing
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Login Prompt (shown if user tries demo without login) */}
      {showLoginPrompt && !user && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-blue-900/30 text-blue-400 rounded-full flex items-center justify-center text-2xl mb-4">
                <FaLock />
              </div>
              <h3 className="text-2xl font-bold mb-2">Create an Account</h3>
              <p className="text-gray-400">
                Sign up to access the full interactive demo and save your progress.
              </p>
            </div>
            
            <div className="space-y-4">
              <Link
                href="/signup"
                className="block w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-center rounded-lg text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Sign Up
              </Link>
              
              <Link
                href="/login"
                className="block w-full py-3 bg-gray-800 text-center rounded-lg text-white hover:bg-gray-700 transition-all"
              >
                Log In
              </Link>
              
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="w-full py-3 text-gray-400 hover:text-white transition-colors"
              >
                Continue with Limited Demo
              </button>
            </div>
          </div>
        </motion.div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Demo Introduction */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Dive Into Our Interactive Experience
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our platform combines intelligent AI guidance, practical coding exercises,
            and mentor feedback to create a uniquely personalized learning experience.
          </p>
        </div>
        
        {/* Two-column layout for demos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-8 h-8 inline-flex items-center justify-center bg-blue-900/30 text-blue-400 rounded-full mr-3 text-sm">1</span>
              <span>Code Playground</span>
            </h3>
            <p className="text-gray-400 mb-6">
              Experience our interactive code editor with real-time feedback and AI-assisted hints 
              when you get stuck. Try different programming concepts and see the results instantly.
            </p>
            
            <CodeDemo />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-8 h-8 inline-flex items-center justify-center bg-blue-900/30 text-blue-400 rounded-full mr-3 text-sm">2</span>
              <span>Interactive Lessons</span>
            </h3>
            <p className="text-gray-400 mb-6">
              Our step-by-step lessons adapt to your learning pace and style, focusing more 
              on areas where you need help and accelerating through concepts you grasp quickly.
            </p>
            
            <InteractiveLesson />
          </div>
        </div>
        
        {/* Features Section */}
        <motion.div 
          ref={featuresRef}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-10 text-center">
            Why Our Approach Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Learning",
                description: "Our platform uses advanced AI to understand your strengths and weaknesses, creating a personalized curriculum just for you.",
                icon: <FaRobot className="text-blue-400" size={24} />
              },
              {
                title: "Real-World Projects",
                description: "Learn by building actual projects that solve real problems, not contrived examples that don't translate to job skills.",
                icon: <FaCode className="text-purple-400" size={24} />
              },
              {
                title: "Expert Mentorship",
                description: "Get guidance from industry professionals who review your code and provide valuable feedback to accelerate your growth.",
                icon: <FaUserGraduate className="text-green-400" size={24} />
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-blue-500/30 transition-all"
              >
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-10 rounded-2xl border border-gray-800"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of students who have transformed their careers through our platform.
            Get unlimited access to all courses, projects, and mentorship.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/signup"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold
                      hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105
                      flex items-center"
            >
              Get Started <FaChevronRight className="ml-2" />
            </Link>
            
            <Link 
              href="/pricing"
              className="px-8 py-4 bg-gray-800 text-white rounded-xl font-medium
                     hover:bg-gray-700 transition-all"
            >
              View Plans
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 