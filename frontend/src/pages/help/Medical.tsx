import React from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../../components/layout/Layout';
import { Card } from '../../components/ui/Card';

export const Medical: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-blue-city-text mb-4">
            Medical <span className="text-gradient">Help</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Healthcare support and assistance for our community members
          </p>
        </motion.div>

        <Card className="p-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Content for Medical Help will be posted soon...
            </p>
            <p className="text-gray-700 leading-relaxed">
              We provide medical assistance and healthcare support to our community members, 
              including connecting them with trusted healthcare professionals and facilities.
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
};


