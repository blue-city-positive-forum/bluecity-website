import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from './ui/Card';

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

  const testimonials = [
    {
      quote: t('home.stories.testimonial1Quote'),
      name: t('home.stories.testimonial1Name'),
      role: t('home.stories.testimonial1Role'),
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    },
    {
      quote: t('home.stories.testimonial2Quote'),
      name: t('home.stories.testimonial2Name'),
      role: t('home.stories.testimonial2Role'),
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    },
    {
      quote: t('home.stories.testimonial3Quote'),
      name: t('home.stories.testimonial3Name'),
      role: t('home.stories.testimonial3Role'),
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
    },
  ];

  return (
    <section
      id="stories"
      ref={ref}
      className="py-20 md:py-32 bg-gradient-to-br from-blue-city-background via-blue-city-secondary/20 to-blue-city-secondary/80 relative overflow-hidden"
    >
      {/* Decorative Pattern Background */}
      <div className="absolute inset-0 bg-pattern opacity-90"></div>

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

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.15 }}
            >
              <Card className="h-full relative">
                <CardContent className="space-y-6">
                  {/* Quote Icon */}
                  <div className="text-6xl text-blue-city-primary/20 font-serif leading-none">
                    "
                  </div>

                  {/* Quote */}
                  <p className="text-gray-700 leading-relaxed text-lg -mt-8">
                    {testimonial.quote}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t border-blue-city-secondary/30">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-blue-city-primary/20"
                    />
                    <div>
                      <div className="font-semibold text-blue-city-text">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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




