import { useState, useEffect } from 'react';

interface ScrollState {
  scrollY: number;
  opacity: number;
  scale: number;
}

export function useScroll(): ScrollState {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = 1 - Math.min(1, scrollY / 500);
  const scale = 1 - Math.min(0.2, scrollY / 1000);

  return { scrollY, opacity, scale };
} 