import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../components/layout/Layout';

export const MatrimonyHome: React.FC = () => {
  const { t } = useTranslation();

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
                {t('pages.matrimonyHome.subtitle')}
              </motion.p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {t('pages.matrimonyHome.title')}
              </h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="w-24 h-1 bg-white mx-auto rounded-full"
              />
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-blue-100 text-lg mt-4 font-semibold"
              >
                {t('matrimony.exclusiveNote')}
              </motion.p>
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
            <div className="text-center">
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                {t('pages.matrimonyHome.intro')}
              </p>
            </div>

            {/* Featured Image - Compact and optimized */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="rounded-lg md:rounded-xl overflow-hidden shadow-md max-w-xl mx-auto"
            >
              <div className="relative h-48 md:h-56">
                <img
                  src={`${import.meta.env.BASE_URL}matrimony.jpeg`}
                  alt="Traditional Indian Wedding - Matrimony Services"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  style={{ objectPosition: 'center 30%' }}
                />
              </div>
            </motion.div>

            {/* Google Form Section */}
            <div className="border-t border-gray-200 pt-12">
              <div className="text-center max-w-2xl mx-auto">
                <div className="flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-city-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {t('pages.matrimonyHome.formTitle')}
                  </h2>
                </div>
                <p className="text-gray-600 mb-4">
                  {t('pages.matrimonyHome.formDescription')}
                </p>
                <p className="text-sm text-gray-500 italic bg-gray-50 p-3 rounded-lg mb-6">
                  {t('pages.matrimonyHome.formNote')}
                </p>
                <button
                  onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLScO16m2kynu3EUv2T5tC8ytrW5s3FH_RxKS5OaoQs2ooUaMpw/viewform', '_blank')}
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-city-primary to-blue-city-accent text-white hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {t('pages.matrimonyHome.openInNewTab')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};
