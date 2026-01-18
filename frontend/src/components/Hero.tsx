import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../utils/constants';
import { useAnimationConfig } from '../hooks/usePerformance';
import jodhpurFortImg from '/jodhpur_fort.jpeg';

export const Hero: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const animConfig = useAnimationConfig();
  
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/55 via-blue-800/60 to-blue-900/55 z-10"></div>
        <img
          src={jodhpurFortImg}
          alt="Jodhpur Blue City"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Decorative Pattern */}
      <div className="absolute inset-0 bg-pattern z-10"></div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <motion.div
          initial={animConfig.initial !== false ? { opacity: 0, y: 30 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: animConfig.duration }}
          className="space-y-4 sm:space-y-6 md:space-y-8"
        >
          <motion.p
            initial={animConfig.initial !== false ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animConfig.duration, delay: animConfig.delay(0.1) }}
            className="text-base sm:text-lg md:text-xl font-semibold text-blue-100 tracking-wide px-4 will-change-transform"
          >
            {t('home.organizationName')}
          </motion.p>
          <motion.h1
            initial={animConfig.initial !== false ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animConfig.duration, delay: animConfig.delay(0.2) }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight px-4 will-change-transform"
          >
            {t('home.heroTitle')}
          </motion.h1>

          <motion.p
            initial={animConfig.initial !== false ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animConfig.duration, delay: animConfig.delay(0.4) }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 max-w-4xl mx-auto px-4 leading-relaxed will-change-transform"
          >
            {t('home.heroDescription')}
          </motion.p>

          <motion.div
            initial={animConfig.initial !== false ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animConfig.duration, delay: animConfig.delay(0.6) }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4 sm:pt-6 will-change-transform"
          >
            <button
              onClick={() => navigate(ROUTES.ABOUT_HISTORY)}
              className="px-6 py-3 text-base sm:text-base font-semibold rounded-2xl bg-blue-city-accent text-white hover:bg-orange-700 shadow-soft hover:shadow-soft-lg transition-all duration-300 md:hover:scale-105 active:scale-95 will-change-transform"
            >
              {t('home.marwarHistory')}
            </button>
            <button
              onClick={() => navigate(ROUTES.FESTIVALS)}
              className="px-6 py-3 text-base sm:text-base font-semibold rounded-2xl bg-white/10 md:backdrop-blur-sm border-2 border-white text-white hover:bg-white/20 transition-all duration-300 md:hover:scale-105 active:scale-95 will-change-transform"
            >
              {t('home.ourFestivals')}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};




