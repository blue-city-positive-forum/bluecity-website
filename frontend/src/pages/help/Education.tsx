import React from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../../components/layout/Layout';
import { Card } from '../../components/ui/Card';

export const Education: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-blue-city-text mb-4">
            Education <span className="text-gradient">Help</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Educational support and guidance for our community
          </p>
        </motion.div>

        <Card className="p-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Content for Education Help will be posted soon...
            </p>
            <p className="text-gray-700 leading-relaxed">
              We assist families with educational guidance, scholarship information, 
              and connecting students with mentors and educational resources.
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
};


