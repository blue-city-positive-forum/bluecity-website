import React from 'react';

/**
 * Optimized IntersectionObserver hook with performance improvements
 */
export const useOptimizedInView = (options?: IntersectionObserverInit) => {
  const [isInView, setIsInView] = React.useState(false);
  const [hasBeenInView, setHasBeenInView] = React.useState(false);
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    // Skip if already been in view (one-time trigger)
    if (hasBeenInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setHasBeenInView(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px', // Start loading slightly before element is visible
        ...options,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasBeenInView, options]);

  return { ref, isInView };
};
