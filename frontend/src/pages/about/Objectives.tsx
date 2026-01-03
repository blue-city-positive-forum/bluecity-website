import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../components/layout/Layout';
import { 
  GraduationCap, 
  Heart, 
  Briefcase, 
  Leaf, 
  Palette, 
  Users 
} from 'lucide-react';

export const Objectives: React.FC = () => {
  const { t } = useTranslation();
  
  const objectives = t('pages.objectives.list', { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  // Icon mapping for each objective
  const objectiveIcons = [
    GraduationCap,
    Heart,
    Briefcase,
    Leaf,
    Palette,
    Users,
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-city-primary to-blue-city-accent text-white py-20 md:py-28 overflow-hidden">
          {/* Decorative Elements */}
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
                {t('pages.objectives.subtitle')}
              </motion.p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {t('pages.objectives.title')}
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

        {/* Cards Grid Section */}
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {objectives.map((objective, index) => {
              const Icon = objectiveIcons[index];
              
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-blue-city-primary" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {objective.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {objective.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </Layout>
  );
};
