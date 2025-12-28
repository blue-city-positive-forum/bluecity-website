import React from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../../components/layout/Layout';
import { Card } from '../../components/ui/Card';

export const GeneralHelp: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-blue-city-text mb-4">
            General <span className="text-gradient">Help</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Community support for all your needs
          </p>
        </motion.div>

        <Card className="p-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Content for General Help will be posted soon...
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you need assistance settling in Ahmedabad, finding local services, 
              or just connecting with fellow community members, we're here to help.
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
};


