import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../components/layout/Layout';

export const WhoWeAre: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-city-primary to-blue-city-accent text-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <p className="text-blue-100 text-sm uppercase tracking-wider mb-3">
                {t('pages.whoWeAre.subtitle')}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold">
                {t('pages.whoWeAre.title')}
              </h1>
            </motion.div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-white rounded-md shadow-sm p-8 border border-gray-200">
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('pages.whoWeAre.intro')}
              </p>
            </div>
          </motion.div>

          {/* Vision & Mission */}
          <div className="space-y-8">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white rounded-md shadow-sm p-8 border-l-4 border-blue-city-primary">
                <h2 className="text-2xl font-bold text-blue-city-text mb-4">
                  {t('pages.whoWeAre.visionLabel')}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('pages.whoWeAre.vision')}
                </p>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-white rounded-md shadow-sm p-8 border-l-4 border-blue-city-accent">
                <h2 className="text-2xl font-bold text-blue-city-text mb-4">
                  {t('pages.whoWeAre.missionLabel')}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('pages.whoWeAre.mission')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
