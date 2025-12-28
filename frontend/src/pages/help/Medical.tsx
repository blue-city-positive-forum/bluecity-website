import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../components/layout/Layout';

export const Medical: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-city-primary to-blue-city-accent text-white py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <p className="text-blue-100 text-sm uppercase tracking-wider mb-3">
                {t('pages.medical.subtitle')}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold">
                {t('pages.medical.title')}
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm p-10 md:p-16"
          >
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('pages.medical.content')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('pages.medical.description')}
            </p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};
