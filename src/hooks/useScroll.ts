import { useState, useEffect } from 'react';

interface ScrollState {
  scrollY: number;
  opacity: number;
  scale: number;
  parallax: number;
}

export function useScroll(): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    opacity: 1,
    scale: 1,
    parallax: 0
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate opacity based on scroll position
      const opacity = Math.max(0, 1 - scrollY / (windowHeight * 0.5));
      
      // Calculate scale based on scroll position
      const scale = Math.max(0.8, 1 - scrollY / (windowHeight * 2));
      
      // Calculate parallax effect
      const parallax = scrollY / (documentHeight - windowHeight);

      setScrollState({
        scrollY,
        opacity,
        scale,
        parallax
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollState;
} 