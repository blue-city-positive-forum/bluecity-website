import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layout } from '../components/layout/Layout';

export const Festivals: React.FC = () => {
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
                {t('pages.festivals.subtitle')}
              </motion.p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {t('pages.festivals.title')}
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
                {t('pages.festivals.intro')}
              </p>
            </div>

            {/* Festivals List Table */}
            <div className="border-t border-gray-200 pt-12">
              <div className="mb-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {t('pages.festivals.festivalsListTitle')}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {t('pages.festivals.festivalsListDescription')}
                </p>
              </div>

              {/* Responsive Table Container */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-blue-city-primary to-blue-city-accent text-white">
                      <tr>
                        <th className="px-4 py-4 text-left text-sm font-semibold">
                          {t('pages.festivals.tableHeaders.srNo')}
                        </th>
                        <th className="px-4 py-4 text-left text-sm font-semibold">
                          {t('pages.festivals.tableHeaders.marwadiMonth')}
                        </th>
                        <th className="px-4 py-4 text-left text-sm font-semibold">
                          {t('pages.festivals.tableHeaders.calendarMonth')}
                        </th>
                        <th className="px-4 py-4 text-left text-sm font-semibold">
                          {t('pages.festivals.tableHeaders.date')}
                        </th>
                        <th className="px-4 py-4 text-left text-sm font-semibold">
                          {t('pages.festivals.tableHeaders.festival')}
                        </th>
                        <th className="px-4 py-4 text-left text-sm font-semibold">
                          {t('pages.festivals.tableHeaders.day')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {(t('pages.festivals.festivalsList', { returnObjects: true }) as Array<{marwadiMonth: string; calendarMonth: string; date: string; festival: string; day: string}>).map((festival, index) => (
                        <tr key={index} className="hover:bg-blue-50 transition-colors">
                          <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                            {index + 1}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {festival.marwadiMonth}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {festival.calendarMonth}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {festival.date}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                            {festival.festival}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {festival.day}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Tablet/Mobile Cards */}
                <div className="lg:hidden divide-y divide-gray-200">
                  {(t('pages.festivals.festivalsList', { returnObjects: true }) as Array<{marwadiMonth: string; calendarMonth: string; date: string; festival: string; day: string}>).map((festival, index) => (
                    <div key={index} className="p-4 hover:bg-blue-50 transition-colors">
                      <div className="flex gap-3">
                        {/* Serial Number - Compact */}
                        <div className="flex-shrink-0 w-7 h-7 rounded-md bg-gradient-to-br from-blue-city-primary to-blue-city-accent text-white flex items-center justify-center font-bold text-xs">
                          {index + 1}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Festival Name */}
                          <h3 className="text-base font-bold text-gray-900 mb-2 leading-tight">
                            {festival.festival}
                          </h3>
                          
                          {/* Festival Details - Stacked */}
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500 text-xs whitespace-nowrap">{t('pages.festivals.tableHeaders.marwadiMonth')}:</span>
                              <span className="text-gray-900 font-medium">{festival.marwadiMonth}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500 text-xs whitespace-nowrap">{t('pages.festivals.tableHeaders.calendarMonth')}:</span>
                              <span className="text-gray-900 font-medium">{festival.calendarMonth}</span>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <div className="flex items-center gap-1">
                                <span className="text-gray-500 text-xs">{t('pages.festivals.tableHeaders.date')}:</span>
                                <span className="text-gray-900 font-medium">{festival.date}</span>
                              </div>
                              <span className="text-gray-300">•</span>
                              <div className="flex items-center gap-1">
                                <span className="text-gray-500 text-xs">{t('pages.festivals.tableHeaders.day')}:</span>
                                <span className="text-gray-700">{festival.day}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Festival Calendar Section */}
            <div className="border-t border-gray-200 pt-12">
              <div className="mb-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {t('pages.festivals.calendarTitle')}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {t('pages.festivals.calendarDescription')}
                </p>
              </div>

              {/* PDF Viewer */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-city-primary/10 to-blue-city-accent/10 p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg 
                      className="w-5 h-5 text-blue-city-primary" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" 
                      />
                    </svg>
                    <span className="font-semibold text-gray-900">{t('pages.festivals.calendarFileName')}</span>
                  </div>
                  <a 
                    href={`${import.meta.env.BASE_URL}Calendar.pdf`}
                    download="Marwari_Calendar_2026.pdf"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-city-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                      />
                    </svg>
                    {t('pages.festivals.downloadButton')}
                  </a>
                </div>
                
                <div className="relative w-full bg-gray-100">
                  <iframe
                    src={`${import.meta.env.BASE_URL}Calendar.pdf`}
                    className="w-full h-[600px] md:h-[800px]"
                    title={t('pages.festivals.calendarTitle')}
                  />
                </div>
              </div>

              {/* Mobile fallback message */}
              <div className="mt-4 text-center text-sm text-gray-600">
                <p>
                  {t('pages.festivals.troubleViewing')}
                  <a 
                    href={`${import.meta.env.BASE_URL}Calendar.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-city-primary hover:underline ml-1 font-semibold"
                  >
                    {t('pages.festivals.openInNewTab')}
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

