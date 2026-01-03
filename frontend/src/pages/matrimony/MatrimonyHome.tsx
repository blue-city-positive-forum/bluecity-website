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

            {/* Google Form Section */}
            <div className="border-t border-gray-200 pt-12">
              <div className="mb-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {t('pages.matrimonyHome.formTitle')}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-2">
                  {t('pages.matrimonyHome.formDescription')}
                </p>
                <p className="text-sm text-gray-500 italic max-w-2xl mx-auto">
                  {t('pages.matrimonyHome.formNote')}
                </p>
              </div>

              {/* Google Form Embed */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative w-full bg-gray-50">
                  <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLScO16m2kynu3EUv2T5tC8ytrW5s3FH_RxKS5OaoQs2ooUaMpw/viewform?embedded=true"
                    className="w-full h-[800px] md:h-[1000px]"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    title={t('pages.matrimonyHome.formTitle')}
                  >
                    Loading…
                  </iframe>
                </div>
              </div>

              {/* Fallback message */}
              <div className="mt-4 text-center text-sm text-gray-600">
                <p>
                  {t('pages.matrimonyHome.troubleViewing')}
                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLScO16m2kynu3EUv2T5tC8ytrW5s3FH_RxKS5OaoQs2ooUaMpw/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-city-primary hover:underline ml-1 font-semibold"
                  >
                    {t('pages.matrimonyHome.openInNewTab')}
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};
