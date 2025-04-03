'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import HeroSection from '@/components/HeroSection';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useScroll } from '@/hooks/useScroll';

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { scrollY, opacity, scale, parallax } = useScroll();
  const { ref: inViewRef, inView } = useInView({ 
    threshold: 0.1,
    triggerOnce: true 
  });

  // Custom cursor effect
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'fixed w-8 h-8 rounded-full border-2 border-blue-500/50 pointer-events-none z-50 mix-blend-difference';
    document.body.appendChild(cursor);

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeChild(cursor);
    };
  }, []);

  return (
    <main ref={mainRef} className="relative min-h-screen overflow-hidden">
      {/* Custom cursor */}
      <div className="fixed w-64 h-64 rounded-full bg-blue-500/5 blur-3xl pointer-events-none z-0" 
           style={{ 
             transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.1}px)` 
           }} 
      />

      {/* Animated background */}
      <AnimatedBackground opacity={opacity} />

      {/* Main content */}
      <motion.div
        className="relative z-10"
        style={{
          opacity,
          scale,
          transform: `translateY(${parallax * 100}px)`
        }}
      >
        <HeroSection parallax={parallax} />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        ref={inViewRef}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-gray-400">Scroll to explore</span>
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-3 bg-blue-500/50 rounded-full"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  );
} 