import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../components/layout/Layout';

export const Education: React.FC = () => {
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
                {t('pages.education.subtitle')}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold">
                {t('pages.education.title')}
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
            className="bg-white rounded-lg shadow-sm p-8 md:p-12"
          >
            <h2 className="text-2xl font-bold text-blue-city-text mb-8">
              {t('pages.education.intro')}
            </h2>

            <div className="space-y-8">
              {/* Purpose */}
              <div>
                <h3 className="text-xl font-bold text-blue-city-text mb-3">
                  01. {t('pages.education.purpose.title')}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t('pages.education.purpose.description')}
                </p>
              </div>

              {/* Definitions */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-bold text-blue-city-text mb-3">
                  02. {t('pages.education.definitions.title')}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t('pages.education.definitions.description')}
                </p>
              </div>

              {/* Committee Members */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-bold text-blue-city-text mb-3">
                  03. {t('pages.education.committee.title')}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t('pages.education.committee.description')}
                </p>
              </div>

              {/* Eligibility */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-bold text-blue-city-text mb-3">
                  {t('pages.education.eligibility.title')}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t('pages.education.eligibility.description')}
                </p>
              </div>

              {/* Educational Requirements */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-bold text-blue-city-text mb-4">
                  A. {t('pages.education.educationalReq.title')}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {t('pages.education.educationalReq.description')}
                </p>
                
                <div className="overflow-x-auto mb-4">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                          Educational Level
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                          Maximum Scholarship Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {t('pages.education.educationalReq.table', { returnObjects: true }).map((row: any, index: number) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">
                            {row.level}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">
                            {row.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <p className="text-sm text-gray-600 italic">
                  {t('pages.education.educationalReq.note')}
                </p>
              </div>

              {/* Minimum Marks & Institution */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-bold text-blue-city-text mb-3">
                  B. {t('pages.education.marksReq.title')}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t('pages.education.marksReq.description')}
                </p>
              </div>

              {/* Income Requirement */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-bold text-blue-city-text mb-3">
                  C. {t('pages.education.incomeReq.title')}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t('pages.education.incomeReq.description')}
                </p>
              </div>

              {/* Residence Requirement */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-bold text-blue-city-text mb-3">
                  D. {t('pages.education.residenceReq.title')}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t('pages.education.residenceReq.description')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};
