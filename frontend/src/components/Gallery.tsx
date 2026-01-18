import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../utils/constants';
import { useOptimizedInView } from '../hooks/useOptimizedInView';
import { useAnimationConfig, useIsMobile } from '../hooks/usePerformance';
import { trackGA4Event } from '../utils/analytics';

// Static gallery images from public folder
const galleryImages = [
  {
    url: `${import.meta.env.BASE_URL}community_gettogether_images/media/image1.jpeg`,
    title: 'Community Get Together',
  },
  {
    url: `${import.meta.env.BASE_URL}community_gettogether_images/media/image2.jpeg`,
    title: 'Community Event',
  },
  {
    url: `${import.meta.env.BASE_URL}social_work_images/media/image1.jpeg`,
    title: 'Social Work Initiative',
  },
  {
    url: `${import.meta.env.BASE_URL}community_gettogether_images/media/image3.jpeg`,
    title: 'Cultural Celebration',
  },
  {
    url: `${import.meta.env.BASE_URL}social_work_images/media/image3.jpeg`,
    title: 'Community Service',
  },
  {
    url: `${import.meta.env.BASE_URL}community_gettogether_images/media/image4.jpeg`,
    title: 'Festive Gathering',
  },
  {
    url: `${import.meta.env.BASE_URL}social_work_images/media/image5.jpeg`,
    title: 'Social Initiative',
  },
  {
    url: `${import.meta.env.BASE_URL}community_gettogether_images/media/image5.jpeg`,
    title: 'Community Celebration',
  },
];

export const Gallery: React.FC = () => {
  const { ref, isInView } = useOptimizedInView();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const animConfig = useAnimationConfig();
  const isMobile = useIsMobile();

  return (
    <section id="gallery" ref={ref as React.RefObject<HTMLElement>} className="py-20 md:py-32 relative contain-layout">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={animConfig.initial !== false ? { opacity: 0, y: 30 } : false}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: animConfig.duration }}
          className="text-center mb-16 will-change-transform"
        >
          <h2 className="text-sm font-semibold text-blue-city-accent uppercase tracking-wider mb-2">
            {t('home.gallery.subtitle')}
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-blue-city-text mb-4">
            {t('home.gallery.title')} <span className="text-gradient">{t('home.gallery.titleHighlight')}</span>
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('home.gallery.description')}
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {galleryImages.map((image, idx) => {
            // On mobile, don't animate individual items for better performance
            const shouldAnimateItem = !isMobile && idx < animConfig.maxAnimatedItems;
            
            return shouldAnimateItem ? (
              <motion.div
                key={idx}
                initial={animConfig.initial !== false ? { opacity: 0, scale: 0.95 } : false}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: animConfig.duration * 0.625, 
                  delay: animConfig.delay(0.3 + idx * 0.1) 
                }}
                onClick={() => {
                  trackGA4Event('gallery_image_click', {
                    image_title: image.title,
                    image_position: idx + 1,
                    location: 'Home Page Gallery Preview'
                  });
                  navigate(ROUTES.GALLERY_SOCIAL_WORK);
                }}
                className="relative group overflow-hidden rounded-2xl shadow-soft cursor-pointer aspect-square will-change-transform"
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover md:transition-transform md:duration-500 md:group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-300 flex items-end">
                  <div className="p-3 md:p-4 text-white">
                    <h4 className="font-semibold text-xs md:text-sm line-clamp-2">{image.title}</h4>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div
                key={idx}
                onClick={() => {
                  trackGA4Event('gallery_image_click', {
                    image_title: image.title,
                    image_position: idx + 1,
                    location: 'Home Page Gallery Preview'
                  });
                  navigate(ROUTES.GALLERY_SOCIAL_WORK);
                }}
                className="relative group overflow-hidden rounded-2xl shadow-soft cursor-pointer aspect-square"
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover md:transition-transform md:duration-500 md:group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-300 flex items-end">
                  <div className="p-3 md:p-4 text-white">
                    <h4 className="font-semibold text-xs md:text-sm line-clamp-2">{image.title}</h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More Button */}
        <motion.div
          initial={animConfig.initial !== false ? { opacity: 0, y: 20 } : false}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: animConfig.duration, delay: animConfig.delay(0.5) }}
          className="text-center mt-12 will-change-transform"
        >
          <button 
            onClick={() => {
              trackGA4Event('button_click', {
                button_name: 'View Full Gallery',
                location: 'Home Page Gallery Section'
              });
              navigate(ROUTES.GALLERY_SOCIAL_WORK);
            }}
            className="inline-flex items-center gap-2 text-blue-city-primary font-semibold text-lg hover:text-blue-city-accent transition-colors cursor-pointer group"
          >
            {t('home.gallery.viewFullGallery')}
            <svg 
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};




