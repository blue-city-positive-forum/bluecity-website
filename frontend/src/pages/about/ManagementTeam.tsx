import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../components/layout/Layout';

export const ManagementTeam: React.FC = () => {
  const { t } = useTranslation();
  
  const members = t('pages.managementTeam.members', { returnObjects: true }) as Array<{
    name: string;
    role: string;
    description: string;
  }>;
  
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
                {t('pages.managementTeam.subtitle')}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold">
                {t('pages.managementTeam.title')}
              </h1>
            </motion.div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-white rounded-md shadow-sm p-8 border border-gray-200">
              <p className="text-lg text-gray-700 leading-relaxed text-center">
                {t('pages.managementTeam.intro')}
              </p>
            </div>
          </motion.div>

          {/* Team Members */}
          <div className="space-y-6">
            {members.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="bg-white rounded-md shadow-sm p-6 md:p-8 border-l-4 border-blue-city-primary hover:shadow-md transition-shadow">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-blue-city-text">
                      {member.name}
                    </h3>
                    <p className="text-blue-city-accent font-semibold mt-1">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
