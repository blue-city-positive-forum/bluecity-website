import { useState, useEffect } from 'react';

/**
 * Performance optimization hooks for mobile devices
 * These hooks help reduce animations, blur effects, and other performance-heavy features
 * on mobile devices and for users who prefer reduced motion.
 */

/**
 * Hook to detect if user prefers reduced motion
 */
export const usePrefersReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

/**
 * Hook to detect if device is mobile (screen width < 768px)
 */
export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

/**
 * Hook to get optimized animation settings based on device and preferences
 */
export const useAnimationConfig = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const shouldReduceMotion = prefersReducedMotion || isMobile;

  return {
    // Disable animations if user prefers reduced motion
    initial: prefersReducedMotion ? false : undefined,
    // Reduce animation duration on mobile
    duration: shouldReduceMotion ? 0.3 : 0.8,
    // Reduce delays on mobile
    delay: (baseDelay: number) => (shouldReduceMotion ? baseDelay * 0.3 : baseDelay),
    // Disable complex animations on mobile
    enableComplexAnimations: !shouldReduceMotion,
    // Reduce number of animated items on mobile
    maxAnimatedItems: isMobile ? 4 : 8,
  };
};

/**
 * Hook to detect if device has low performance (mobile or slow connection)
 */
export const useLowPerformance = (): boolean => {
  const [isLowPerf, setIsLowPerf] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    // Check if connection is slow (if available)
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const isSlowConnection = connection ? 
      (connection.effectiveType === 'slow-2g' || 
       connection.effectiveType === '2g' || 
       connection.effectiveType === '3g' ||
       connection.saveData) : false;

    setIsLowPerf(isMobile || isSlowConnection);
  }, []);

  return isLowPerf;
};
