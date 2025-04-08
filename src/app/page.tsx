'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmoothScroll from '@/components/SmoothScroll';

// Dynamically import components that require client-side rendering
const Hero3D = dynamic(() => import('@/components/Hero3D'), { ssr: false });
const WaitlistForm = dynamic(() => import('@/components/WaitlistForm'), { ssr: false });
const AnimatedBackground = dynamic(() => import('@/components/AnimatedBackground'), { ssr: false });

export default function Home() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
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
    
    if (testimonialsRef.current) {
      gsap.fromTo(
        testimonialsRef.current.children,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.3,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 70%",
            end: "bottom 20%",
            scrub: 1,
          }
        }
      );
    }
  }, []);
  
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0A0A0B] text-white overflow-hidden">
        {/* Hero section with 3D elements */}
        <Hero3D />
        
        {/* Features section */}
        <section className="relative py-24 px-6 overflow-hidden">
          <AnimatedBackground opacity={0.3} />
          
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Revolutionary Learning Experience
            </h2>
            
            <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  title: "AI-Powered Personalization",
                  description: "Our cutting-edge AI algorithms understand your learning style and adapt the curriculum in real-time to maximize your progress.",
                  icon: "🧠"
                },
                {
                  title: "Expert Mentorship",
                  description: "Connect with industry professionals who provide personalized guidance and feedback on your coding journey.",
                  icon: "👨‍🏫"
                },
                {
                  title: "Real-World Projects",
                  description: "Build an impressive portfolio with projects that solve actual problems, giving you practical experience employers value.",
                  icon: "💻"
                },
                {
                  title: "Community Learning",
                  description: "Join a vibrant community of learners and professionals to share knowledge and collaborate on challenging problems.",
                  icon: "👥"
                },
                {
                  title: "Accelerated Progress",
                  description: "Our optimized learning paths help you acquire skills 3x faster than traditional methods by focusing on what matters most.",
                  icon: "🚀"
                },
                {
                  title: "Continuous Feedback",
                  description: "Receive instant, actionable feedback on your code to quickly identify and fix problems in your understanding.",
                  icon: "📈"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
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
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials section */}
        <section className="py-24 px-6 bg-gradient-to-b from-[#0A0A0B] via-[#121218] to-[#0A0A0B]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Success Stories
            </h2>
            
            <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
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
              ].map((testimonial, index) => (
                <div 
                  key={index}
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
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Waitlist section */}
        <section className="py-24 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-purple-900/10" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Be the First to Experience it
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join our exclusive waitlist to get early access to our revolutionary learning platform 
              and receive special founder benefits.
            </p>
            
            <WaitlistForm />
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-12 px-6 bg-gray-950 border-t border-gray-900">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Engiunity</h3>
              <p className="text-gray-400">Revolutionizing coding education through AI-powered personalized learning.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Curriculum</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Mentorship</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-800 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Engiunity. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </SmoothScroll>
  );
} 