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

export const CTA: React.FC = () => {
  const { ref, isInView } = useInView();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section id="contact" ref={ref} className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-city-primary to-blue-city-accent"></div>

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-12">
            {t('home.cta.description')}
            <br />{t('home.cta.descriptionLine2')}
          </p>

          {/* Membership Details */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 max-w-4xl mx-auto mb-12 border border-white/20"
          >
            <div className="grid md:grid-cols-3 gap-8 text-white">
              <div>
                <div className="text-5xl font-bold mb-2">{t('home.cta.priceAmount')}</div>
                <div className="text-blue-100">{t('home.cta.priceLabel')}</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">{t('home.cta.lifetimeLabel')}</div>
                <div className="text-blue-100">{t('home.cta.lifetimeDesc')}</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">{t('home.cta.familyLabel')}</div>
                <div className="text-blue-100">{t('home.cta.familyDesc')}</div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            {/* Join Us button hidden temporarily */}
            {/* <button
              onClick={() => navigate(ROUTES.JOIN_US)}
              className="px-10 py-4 text-lg font-semibold rounded-2xl bg-blue-city-accent text-white hover:bg-orange-700 shadow-soft-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {t('home.cta.becomeMember')}
            </button> */}
            <button
              onClick={() => navigate(ROUTES.CONTACT)}
              className="px-10 py-4 text-lg font-semibold rounded-2xl bg-blue-city-accent text-white hover:bg-orange-700 shadow-soft-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {t('home.cta.contactUs')}
            </button>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-white"
          >
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-3">📧</div>
              <div className="font-semibold mb-1">{t('home.cta.emailLabel')}</div>
              <a href="mailto:info@bluecityparivar.com" className="text-blue-100 hover:text-white transition-colors">
                info@bluecityparivar.com
              </a>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-3">📱</div>
              <div className="font-semibold mb-1">{t('home.cta.whatsappLabel')}</div>
              <a href="tel:+919876543210" className="text-blue-100 hover:text-white transition-colors">
                +91 98765 43210
              </a>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-3">📍</div>
              <div className="font-semibold mb-1">{t('home.cta.locationLabel')}</div>
              <div className="text-blue-100">{t('home.cta.locationValue')}</div>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center gap-6 mt-12"
          >
            <a
              href="https://facebook.com/bluecityparivar"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
              aria-label="Facebook"
            >
              <span className="text-white font-semibold text-sm">F</span>
            </a>
            <a
              href="https://instagram.com/bluecityparivar"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <span className="text-white font-semibold text-sm">I</span>
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
              aria-label="WhatsApp"
            >
              <span className="text-white font-semibold text-sm">W</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};




