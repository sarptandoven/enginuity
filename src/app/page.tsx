'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaRobot, 
  FaCode, 
  FaUserGroup, 
  FaRocket, 
  FaChartLine,
  FaArrowRight,
  FaCirclePlay
} from 'react-icons/fa6';
import SmoothScroll from '@/components/SmoothScroll';
import { useAuth } from '@/lib/auth-context';
import WaitlistForm from '@/components/WaitlistForm';

// Define types
interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Testimonial component with animation
const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="p-8 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-900/30 backdrop-blur-md border border-gray-800 hover:border-purple-500/30 transition-all duration-500"
    >
      <div className="flex items-start mb-6">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75" />
          <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-white/20">
            <img src={testimonial.avatar} alt={testimonial.author} className="object-cover w-full h-full" />
          </div>
        </div>
        <div className="ml-6">
          <p className="text-lg font-medium text-white">{testimonial.author}</p>
          <p className="text-sm text-blue-400">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-gray-300 italic leading-relaxed">"{testimonial.quote}"</p>
    </motion.div>
  );
};

// Feature card component
const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 group"
    >
      <div className="text-4xl mb-6 group-hover:scale-125 transform transition-transform duration-300">
        {feature.icon}
      </div>
      <h3 className="text-2xl font-semibold mb-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
        {feature.title}
      </h3>
      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
        {feature.description}
      </p>
    </motion.div>
  );
};

// Dynamically import components that require client-side rendering
const Hero3D = dynamic(() => import('@/components/Hero3D'), { ssr: false });
const AnimatedBackground = dynamic(() => import('@/components/AnimatedBackground'), { ssr: false });

export default function Home() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const { session, status } = useAuth();
  
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize scroll animations
    if (featuresRef.current) {
      gsap.fromTo(
        featuresRef.current.children,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          }
        }
      );
    }
  }, []);
  
  const features: Feature[] = [
    {
      title: "AI-Powered Personalization",
      description: "Our cutting-edge AI algorithms understand your learning style and adapt the curriculum in real-time to maximize your progress.",
      icon: <FaRobot className="text-blue-500" />
    },
    {
      title: "Expert Mentorship",
      description: "Connect with industry professionals who provide personalized guidance and feedback on your coding journey.",
      icon: <FaUserGroup className="text-purple-500" />
    },
    {
      title: "Real-World Projects",
      description: "Build an impressive portfolio with projects that solve actual problems, giving you practical experience employers value.",
      icon: <FaCode className="text-green-500" />
    },
    {
      title: "Community Learning",
      description: "Join a vibrant community of learners and professionals to share knowledge and collaborate on challenging problems.",
      icon: <FaUserGroup className="text-yellow-500" />
    },
    {
      title: "Accelerated Progress",
      description: "Our optimized learning paths help you acquire skills 3x faster than traditional methods by focusing on what matters most.",
      icon: <FaRocket className="text-red-500" />
    },
    {
      title: "Continuous Feedback",
      description: "Receive instant, actionable feedback on your code to quickly identify and fix problems in your understanding.",
      icon: <FaChartLine className="text-cyan-500" />
    }
  ];
  
  const testimonials: Testimonial[] = [
    {
      quote: "The personalized learning approach completely transformed how I learn to code. I've accomplished in 3 months what would have taken me a year in a traditional bootcamp.",
      author: "Alex Chen",
      role: "Software Engineer at Google",
      avatar: "https://randomuser.me/api/portraits/men/34.jpg"
    },
    {
      quote: "As someone who tried multiple coding platforms, nothing compares to the mentorship and adaptive curriculum here. It's like having a personal coach guiding your every step.",
      author: "Sarah Johnson",
      role: "Frontend Developer at Airbnb",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "The projects are incredibly well-designed and relevant to today's industry needs. I used them directly in my portfolio, which helped me land my dream job.",
      author: "Michael Rodriguez",
      role: "Full Stack Developer at Stripe",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg"
    },
    {
      quote: "The community aspect sets this platform apart. Being able to collaborate with like-minded learners accelerated my growth and opened up job opportunities I never expected.",
      author: "Priya Patel",
      role: "Data Engineer at Netflix",
      avatar: "https://randomuser.me/api/portraits/women/29.jpg"
    }
  ];
  
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0A0A0B] text-white overflow-hidden">
        {/* Hero section with 3D elements */}
        <section className="relative h-screen overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Hero3D />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/80 z-10" />
          
          <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 text-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, type: "spring", stiffness: 100 }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient">
                  Transform Your
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 animate-gradient">
                  Coding Journey
                </span>
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="max-w-4xl"
            >
              <p className="text-2xl md:text-3xl text-gray-200 mb-12 leading-relaxed font-light">
                Experience the future of coding education with our
                <span className="text-blue-400 font-medium"> AI-powered </span>
                platform that adapts to
                <span className="text-purple-400 font-medium"> your unique journey</span>.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              {status === 'loading' ? (
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              ) : status === 'authenticated' ? (
                <div className="glass p-6 rounded-2xl">
                  <p className="text-xl">Welcome back, <span className="text-blue-400 font-semibold">{session?.user?.name || session?.user?.email}</span></p>
                </div>
              ) : (
                <div className="max-w-md mx-auto glass p-8 rounded-2xl">
                  <p className="text-xl mb-6 font-medium text-blue-400">Join our exclusive waitlist!</p>
                  <WaitlistForm />
                </div>
              )}
              
              <Link 
                href="/demo" 
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold 
                         text-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center
                         shadow-lg hover:shadow-2xl hover:scale-105 transform"
              >
                <FaCirclePlay className="mr-3 group-hover:animate-pulse" /> 
                Watch Demo
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            >
              <div className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform duration-300">
                <p className="text-sm text-gray-400 mb-2 font-medium tracking-wide">Explore More</p>
                <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center p-1">
                  <motion.div 
                    className="w-1 h-1 bg-blue-400 rounded-full"
                    animate={{ 
                      y: [0, 12, 0],
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Features section */}
        <section className="relative py-32 px-6 overflow-hidden">
          <AnimatedBackground opacity={0.2} />
          
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-0"
              >
                <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient">
                    Revolutionary
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 animate-gradient">
                    Learning Experience
                  </span>
                </h2>
                <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                  We've reimagined coding education from the ground up, focusing on what actually
                  <span className="text-blue-400 font-medium"> works </span>
                  to help you master complex skills
                  <span className="text-purple-400 font-medium"> quickly and effectively</span>.
                </p>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className="group h-full bg-gradient-to-br from-gray-900/80 to-gray-900/30 backdrop-blur-xl 
                              border border-gray-800 hover:border-blue-500/50 rounded-2xl p-8
                              hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500
                              transform hover:-translate-y-2">
                    <div className="text-5xl mb-8 group-hover:scale-110 transform transition-transform duration-500 
                                text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent 
                               bg-gradient-to-r from-blue-400 to-purple-600">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How it works section */}
        <section className="py-24 px-6 bg-gradient-to-b from-[#0A0A0B] via-[#121218] to-[#0A0A0B]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-0"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  How It Works
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Our platform adapts to your unique learning needs, creating a personalized journey
                  that evolves as you progress.
                </p>
              </motion.div>
            </div>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 transform -translate-x-1/2"></div>
              
              {/* Timeline steps */}
              {[
                {
                  title: "AI Assessment",
                  description: "Our intelligent system evaluates your current skills, learning style, and goals to create a personalized learning plan just for you.",
                  icon: <FaRobot className="text-blue-500" />
                },
                {
                  title: "Custom Curriculum",
                  description: "Based on your assessment, we build a tailored curriculum that focuses on the skills you need to develop, optimized for your learning style.",
                  icon: <FaCode className="text-purple-500" />
                },
                {
                  title: "Project-Based Learning",
                  description: "Apply what you've learned through real-world projects that build your portfolio and demonstrate your skills to future employers.",
                  icon: <FaRocket className="text-red-500" />
                },
                {
                  title: "Mentor Guidance",
                  description: "Get personalized feedback and guidance from industry professionals who help you overcome challenges and grow as a developer.",
                  icon: <FaUserGroup className="text-green-500" />
                }
              ].map((step, index) => (
                <div key={index} className="relative z-10 mb-16 md:mb-24">
                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7 }}
                      className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 lg:pr-24' : 'md:pl-12 lg:pl-24'} mb-8 md:mb-0`}
                    >
                      <h3 className="text-2xl font-bold mb-4 text-white">
                        {step.title}
                      </h3>
                      <p className="text-gray-300">
                        {step.description}
                      </p>
                    </motion.div>
                    
                    <div className="flex-shrink-0 relative">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-900 border-4 border-gray-800 flex items-center justify-center text-3xl relative z-10"
                      >
                        {step.icon}
                      </motion.div>
                    </div>
                    
                    <div className="md:w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials section */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-0"
              >
                <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient">
                    Success Stories
                  </span>
                </h2>
                <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                  Hear from students who have
                  <span className="text-blue-400 font-medium"> transformed </span>
                  their careers through our
                  <span className="text-purple-400 font-medium"> revolutionary platform</span>.
                </p>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="group"
                >
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-900/30 backdrop-blur-xl 
                              border border-gray-800 group-hover:border-purple-500/30 transition-all duration-500
                              transform group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-purple-500/10">
                    <div className="flex items-start mb-8">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 
                                    group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-white/20 transform 
                                    group-hover:scale-110 transition-transform duration-500">
                          <img src={testimonial.avatar} alt={testimonial.author} className="object-cover w-full h-full" />
                        </div>
                      </div>
                      <div className="ml-6">
                        <p className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                          {testimonial.author}
                        </p>
                        <p className="text-lg text-blue-400 group-hover:text-purple-400 transition-colors duration-300">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-xl text-gray-300 italic leading-relaxed group-hover:text-white transition-colors duration-300">
                      "{testimonial.quote}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Waitlist section */}
        <section className="py-32 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-purple-900/10 to-pink-900/10" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient">
                  Be the First to
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 animate-gradient">
                  Experience it
                </span>
              </h2>
              <p className="text-2xl text-gray-300 mb-12 leading-relaxed font-light max-w-3xl mx-auto">
                Join our exclusive waitlist to get
                <span className="text-blue-400 font-medium"> early access </span>
                to our revolutionary learning platform and receive
                <span className="text-purple-400 font-medium"> special founder benefits</span>.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-900/80 to-gray-900/30 backdrop-blur-xl 
                        border border-gray-800 rounded-2xl p-12 transform hover:scale-[1.02] 
                        transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <WaitlistForm />
            </motion.div>
          </div>
        </section>
      </main>
    </SmoothScroll>
  );
} 