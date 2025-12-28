import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../utils/constants';

const useInView = () => {
  const [isInView, setIsInView] = React.useState(false);
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isInView };
};

const galleryImages = [
  {
    url: 'https://picsum.photos/800/600?random=1',
    title: 'Diwali 2024',
    span: 'col-span-2 h-[400px]',
  },
  {
    url: 'https://picsum.photos/400/400?random=2',
    title: 'Holi Celebration',
    span: 'col-span-1 h-[250px]',
  },
  {
    url: 'https://picsum.photos/400/400?random=3',
    title: 'Folk Dance',
    span: 'col-span-1 h-[250px]',
  },
  {
    url: 'https://picsum.photos/400/500?random=4',
    title: 'Color Festival',
    span: 'col-span-1 h-[300px]',
  },
  {
    url: 'https://picsum.photos/400/500?random=5',
    title: 'Cultural Evening',
    span: 'col-span-1 h-[300px]',
  },
  {
    url: 'https://picsum.photos/800/400?random=6',
    title: 'Community Gathering',
    span: 'col-span-2 h-[250px]',
  },
];

export const Gallery: React.FC = () => {
  const { ref, isInView } = useInView();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section id="gallery" ref={ref} className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-city-primary/15 rounded-full blur-3xl -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {galleryImages.map((image, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              className={`${image.span} relative group overflow-hidden rounded-2xl shadow-soft cursor-pointer`}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <h4 className="font-semibold text-lg">{image.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button 
            onClick={() => navigate(ROUTES.GALLERY)}
            className="text-blue-city-primary font-semibold text-lg hover:text-blue-city-accent transition-colors cursor-pointer"
          >
            {t('home.gallery.viewFullGallery')} →
          </button>
        </motion.div>
      </div>
    </section>
  );
};




