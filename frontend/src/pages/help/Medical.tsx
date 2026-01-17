import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../components/layout/Layout';
import { Stethoscope, Ambulance, Droplets, Package, DollarSign, ShieldCheck, Heart } from 'lucide-react';

export const Medical: React.FC = () => {
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
                {t('pages.medical.subtitle')}
              </motion.p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {t('pages.medical.title')}
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
            className="space-y-10"
          >
            {/* Introduction */}
            <div className="text-center">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                {t('pages.medical.intro')}
              </p>
            </div>

            {/* What We Can Help With */}
            <div className="border-t border-gray-200 pt-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                {t('pages.medical.whatWeHelp.title')}
              </h2>

              {/* Doctors & Hospitals */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                  <Stethoscope className="w-6 h-6 text-blue-city-primary" />
                  {t('pages.medical.whatWeHelp.doctors.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('pages.medical.whatWeHelp.doctors.description')}
                </p>
              </div>

              {/* Ambulance Services */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                  <Ambulance className="w-6 h-6 text-blue-city-primary" />
                  {t('pages.medical.whatWeHelp.ambulance.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('pages.medical.whatWeHelp.ambulance.description')}
                </p>
              </div>

              {/* Blood Banks */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                  <Droplets className="w-6 h-6 text-blue-city-primary" />
                  {t('pages.medical.whatWeHelp.bloodBank.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('pages.medical.whatWeHelp.bloodBank.description')}
                </p>
              </div>

              {/* Medical Equipment */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                  <Package className="w-6 h-6 text-blue-city-primary" />
                  {t('pages.medical.whatWeHelp.equipment.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('pages.medical.whatWeHelp.equipment.description')}
                </p>
              </div>

              {/* Financial Support */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                  <DollarSign className="w-6 h-6 text-blue-city-primary" />
                  {t('pages.medical.whatWeHelp.financial.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('pages.medical.whatWeHelp.financial.description')}
                </p>
              </div>
            </div>

            {/* Our Approach */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-blue-city-primary" />
                {t('pages.medical.approach.title')}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 bg-blue-city-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>{t('pages.medical.approach.point1')}</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 bg-blue-city-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>{t('pages.medical.approach.point2')}</span>
                </li>
              </ul>
            </div>

            {/* Why This Matters */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                <Heart className="w-6 h-6 text-blue-city-primary" />
                {t('pages.medical.whyMatters.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('pages.medical.whyMatters.description')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};
