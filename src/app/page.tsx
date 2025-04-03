'use client';

import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';
import { useScroll } from '@/hooks/useScroll';

const HeroSection = dynamic(() => import('@/components/HeroSection'), {
  ssr: false,
});

const AnimatedBackground = dynamic(() => import('@/components/AnimatedBackground'), {
  ssr: false,
});

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const { opacity, scale } = useScroll();

  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white overflow-hidden" ref={containerRef}>
      <AnimatedBackground opacity={opacity} />
      <HeroSection opacity={opacity} scale={scale} />
    </main>
  );
} 