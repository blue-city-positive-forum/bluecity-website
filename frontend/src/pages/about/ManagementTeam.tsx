import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../components/layout/Layout';
import { 
  Scale, 
  Heart, 
  Briefcase, 
  Calculator, 
  ShoppingBag, 
  FileText, 
  Building2,
  Award
} from 'lucide-react';

export const ManagementTeam: React.FC = () => {
  const { t } = useTranslation();
  
  const members = t('pages.managementTeam.members', { returnObjects: true }) as Array<{
    name: string;
    role: string;
    description: string;
  }>;

  // Icon mapping based on roles
  const getRoleIcon = (index: number) => {
    const icons = [
      Scale,        // Advocate
      Heart,        // Social Worker
      Briefcase,    // Industrialist
      Calculator,   // CA Rajendra
      Calculator,   // CA Mundra
      ShoppingBag,  // Business Leader
      FileText,     // IPR Specialist
      Building2     // VP Adani
    ];
    return icons[index] || Award;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-city-primary to-blue-city-accent text-white py-20 md:py-28 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
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
                {t('pages.managementTeam.subtitle')}
              </motion.p>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {t('pages.managementTeam.title')}
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
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12 md:mb-16"
          >
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              {t('pages.managementTeam.intro')}
            </p>
          </motion.div>

          {/* Team Grid */}
          <div>
            {/* First 6 members in 3 columns */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8"
            >
              {members.slice(0, 6).map((member, index) => {
                const Icon = getRoleIcon(index);
                
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                  >
                    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 h-full">
                      {/* Photo */}
                      <div className="mb-5">
                        <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                          {/* <Icon className="w-14 h-14 text-gray-400" /> */}
                        </div>
                      </div>

                      {/* Name */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                        {member.name}
                      </h3>

                      {/* Role */}
                      <p className="text-sm font-semibold text-blue-city-primary mb-4 text-center">
                        {member.role}
                      </p>

                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed text-center">
                        {member.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Last 2 members centered */}
            {members.length > 6 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto"
              >
                {members.slice(6).map((member, index) => {
                  const Icon = getRoleIcon(index + 6);
                  
                  return (
                    <motion.div
                      key={index + 6}
                      variants={cardVariants}
                    >
                      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 h-full">
                        {/* Photo */}
                        <div className="mb-5">
                          <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                            <Icon className="w-14 h-14 text-gray-400" />
                          </div>
                        </div>

                        {/* Name */}
                        <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                          {member.name}
                        </h3>

                        {/* Role */}
                        <p className="text-sm font-semibold text-blue-city-primary mb-4 text-center">
                          {member.role}
                        </p>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed text-center">
                          {member.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
