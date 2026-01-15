import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../components/layout/Layout';
import { Heart, Users, Handshake, Award } from 'lucide-react';

export const SocialWork: React.FC = () => {
  const { t } = useTranslation();

  const initiativeIcons = [
    Heart,        // Social Empowerment & Welfare
    Users,        // Regional Advocacy
    Handshake,    // Strategic Partnerships
    Award,        // Leadership-Driven Outreach
  ];
  
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-city-primary to-blue-city-accent text-white py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-blue-100 text-sm uppercase tracking-widest mb-4 font-semibold"
              >
                {t('pages.socialWork.subtitle')}
              </motion.p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {t('pages.socialWork.title')}
              </h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="w-24 h-1 bg-white mx-auto rounded-full"
              />
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-12"
          >
            {/* Introduction */}
            <div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('pages.socialWork.intro')}
              </p>
            </div>

            {/* Images Gallery - Hidden on mobile, shown on laptop+ */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="rounded-lg overflow-hidden shadow-md"
                >
                  <div className="relative h-56">
                    <img
                      src={`${import.meta.env.BASE_URL}social_work_images/media/image1.jpeg`}
                      alt="Women Health Awareness Initiative"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="rounded-lg overflow-hidden shadow-md"
                >
                  <div className="relative h-56">
                    <img
                      src={`${import.meta.env.BASE_URL}social_work_images/media/image3.jpeg`}
                      alt="Capacity Building and Youth Empowerment"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="rounded-lg overflow-hidden shadow-md"
                >
                  <div className="relative h-56">
                    <img
                      src={`${import.meta.env.BASE_URL}social_work_images/media/image5.jpeg`}
                      alt="Community Infrastructure Development"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Summary Title */}
            <div className="border-t border-gray-200 pt-8 lg:pt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                {t('pages.socialWork.summaryTitle')}
              </h2>

              {/* Initiatives */}
              <div className="space-y-10">
                {t('pages.socialWork.initiatives', { returnObjects: true }).map((initiative: any, index: number) => {
                  const Icon = initiativeIcons[index];
                  
                  return (
                    <React.Fragment key={index}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex gap-4 group"
                      >
                        <div className="flex-shrink-0 mt-1">
                          <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-300">
                            <Icon className="w-6 h-6 text-blue-city-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-3">
                            {initiative.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {initiative.description}
                          </p>
                        </div>
                      </motion.div>

                      {/* Mobile-only images - shown between initiatives */}
                      {index < 3 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="lg:hidden rounded-lg overflow-hidden shadow-md max-w-lg mx-auto my-6"
                        >
                          <div className="relative h-44">
                            <img
                              src={`${import.meta.env.BASE_URL}social_work_images/media/image${index === 0 ? '1' : index === 1 ? '3' : '5'}.jpeg`}
                              alt={`Social Work Initiative ${index + 1}`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        </motion.div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};
