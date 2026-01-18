import React from 'react';
import { motion } from 'framer-motion';
import { useAnimationConfig, useLowPerformance } from '../../hooks/usePerformance';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
}

/**
 * Optimized PageHero component with mobile performance enhancements
 * - Reduces/removes blur effects on mobile devices
 * - Optimizes animations based on device capabilities
 * - Uses will-change hints for better GPU acceleration
 */
export const PageHero: React.FC<PageHeroProps> = ({ 
  title, 
  subtitle, 
  description,
  children 
}) => {
  const animConfig = useAnimationConfig();
  const isLowPerf = useLowPerformance();

  return (
    <div className="relative bg-gradient-to-r from-blue-city-primary to-blue-city-accent text-white py-20 md:py-28 overflow-hidden">
      {/* Decorative blobs - hidden on mobile via CSS (see index.css) */}
      {!isLowPerf && (
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={animConfig.initial !== false ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: animConfig.duration }}
          className="text-center will-change-transform"
        >
          {subtitle && (
            <motion.p 
              initial={animConfig.initial !== false ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ delay: animConfig.delay(0.2), duration: animConfig.duration }}
              className="text-blue-100 text-sm uppercase tracking-widest mb-4 font-semibold will-change-opacity"
            >
              {subtitle}
            </motion.p>
          )}
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            {title}
          </h1>
          
          {description && (
            <p className="text-blue-50 text-base md:text-lg max-w-2xl mx-auto mt-4">
              {description}
            </p>
          )}
          
          {animConfig.enableComplexAnimations && (
            <motion.div
              initial={animConfig.initial !== false ? { scaleX: 0 } : false}
              animate={{ scaleX: 1 }}
              transition={{ delay: animConfig.delay(0.4), duration: animConfig.duration * 0.75 }}
              className="w-24 h-1 bg-white mx-auto rounded-full mt-6 will-change-transform"
            />
          )}
          
          {children}
        </motion.div>
      </div>
    </div>
  );
};
