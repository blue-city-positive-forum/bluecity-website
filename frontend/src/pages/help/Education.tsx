import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../components/layout/Layout';
import { GraduationCap, FileText, Users, CheckCircle2, BookOpen, TrendingUp, DollarSign, MapPin } from 'lucide-react';

export const Education: React.FC = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  
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
                {t('pages.education.subtitle')}
              </motion.p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {t('pages.education.title')}
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
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {t('pages.education.intro')}
              </h2>
            </div>

            {/* Purpose */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-blue-city-primary" />
                {t('pages.education.purpose.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('pages.education.purpose.description')}
              </p>
            </div>

            {/* Definitions */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-city-primary" />
                {t('pages.education.definitions.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('pages.education.definitions.description')}
              </p>
            </div>

            {/* Committee Members */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                <Users className="w-6 h-6 text-blue-city-primary" />
                {t('pages.education.committee.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('pages.education.committee.description')}
              </p>
            </div>

            {/* Eligibility */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-blue-city-primary" />
                {t('pages.education.eligibility.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('pages.education.eligibility.description')}
              </p>
            </div>

            {/* Educational Requirements - Card with Table */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-blue-city-primary" />
                A. {t('pages.education.educationalReq.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {t('pages.education.educationalReq.description')}
              </p>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-city-primary to-blue-city-accent text-white">
                        <th className="px-4 py-3 text-left font-semibold">
                          Educational Level
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                          Maximum Scholarship Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {t('pages.education.educationalReq.table', { returnObjects: true }).map((row: any, index: number) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-blue-50/50 transition-colors">
                          <td className="px-4 py-3 text-gray-700">
                            {row.level}
                          </td>
                          <td className="px-4 py-3 text-gray-700 font-semibold">
                            {row.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 italic mt-4 bg-gray-50 p-3 rounded-lg">
                {t('pages.education.educationalReq.note')}
              </p>
            </div>

            {/* Minimum Marks & Institution */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-blue-city-primary" />
                B. {t('pages.education.marksReq.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('pages.education.marksReq.description')}
              </p>
            </div>

            {/* Income Requirement */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-blue-city-primary" />
                C. {t('pages.education.incomeReq.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('pages.education.incomeReq.description')}
              </p>
            </div>

            {/* Residence Requirement */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-blue-city-primary" />
                D. {t('pages.education.residenceReq.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('pages.education.residenceReq.description')}
              </p>
            </div>

            {/* Application Form Section */}
            <div className="border-t border-gray-200 pt-12">
              <div className="text-center max-w-2xl mx-auto">
                <div className="flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-city-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {t('pages.education.applicationForm.title')}
                  </h2>
                </div>
                <p className="text-gray-600 mb-4">
                  {t('pages.education.applicationForm.description')}
                </p>
                <p className="text-sm text-blue-city-primary font-semibold bg-blue-50 p-3 rounded-lg mb-6">
                  {t('pages.education.applicationForm.note')}
                </p>
                <button
                  onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSciRk1tAUX-N3s4YwRLcwAwMMU0koV67ECzcBfkS467vbju7w/viewform', '_blank')}
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-city-primary to-blue-city-accent text-white hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {t('pages.education.applicationForm.openInNewTab')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};
