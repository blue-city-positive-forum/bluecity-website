import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/65 via-blue-800/70 to-blue-900/65 z-10"></div>
        <img
          src="/jodhpur_fort.jpeg"
          alt="Jodhpur Blue City"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Decorative Pattern */}
      <div className="absolute inset-0 bg-pattern z-10"></div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 sm:py-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 sm:space-y-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight"
          >
            Where Jodhpur Meets
            <br />
            <span className="text-blue-city-secondary">Ahmedabad</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-2xl text-blue-100 max-w-3xl mx-auto px-4"
          >
            A vibrant community keeping our Marwari roots alive through culture, 
            <br className="hidden sm:block" />festivals, and cherished connections in the heart of Gujarat.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4 sm:pt-8"
          >
            <Button size="md" variant="secondary" className="sm:text-base">
              Join the Parivar
            </Button>
            <Button size="md" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-blue-city-primary sm:text-base">
              Explore Events
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto pt-8 sm:pt-16"
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">500+</div>
              <div className="text-blue-200 mt-1 sm:mt-2 text-xs sm:text-base">Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">50+</div>
              <div className="text-blue-200 mt-1 sm:mt-2 text-xs sm:text-base">Events</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">10+</div>
              <div className="text-blue-200 mt-1 sm:mt-2 text-xs sm:text-base">Years Strong</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};




