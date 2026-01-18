import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

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

export const Stories: React.FC = () => {
  const { ref, isInView } = useInView();
  const { t } = useTranslation();

  const videos = [
    {
      src: `${import.meta.env.BASE_URL}our_stories/story1.mp4`,
      poster: `${import.meta.env.BASE_URL}our_stories/story1.jpg`,
      title: "Our Story - Part 1"
    },
    {
      src: `${import.meta.env.BASE_URL}our_stories/story2.mp4`,
      poster: `${import.meta.env.BASE_URL}our_stories/story2.jpg`,
      title: "Our Story - Part 2"
    }
  ];

  return (
    <section
      id="stories"
      ref={ref}
      className="py-20 md:py-32 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold text-blue-city-accent uppercase tracking-wider mb-2">
            {t('home.stories.subtitle')}
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-blue-city-text mb-4">
            {t('home.stories.title')} <span className="text-gradient">{t('home.stories.titleHighlight')}</span>
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('home.stories.description')}
          </p>
        </motion.div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16 max-w-4xl mx-auto">
          {videos.map((video, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.15 }}
              className="w-full flex justify-center"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-soft-lg bg-gray-900 w-full max-w-[360px]">
                <video
                  className="w-full h-auto max-h-[640px]"
                  controls
                  preload="metadata"
                  playsInline
                  poster={video.poster}
                  aria-label={video.title}
                >
                  <source src={`${video.src}#t=0.5`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-city-primary to-blue-city-accent p-12 rounded-3xl shadow-soft-lg">
            <p className="text-2xl md:text-3xl text-white font-display italic leading-relaxed">
              "{t('home.stories.featuredQuote')}"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};




