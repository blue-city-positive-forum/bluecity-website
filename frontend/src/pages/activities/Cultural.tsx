import React from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../../components/layout/Layout';
import { Card } from '../../components/ui/Card';

export const Cultural: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-blue-city-text mb-4">
            Cultural <span className="text-gradient">Activities</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrating our rich heritage and traditions
          </p>
        </motion.div>

        <Card className="p-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Content for Cultural Activities will be posted soon...
            </p>
            <p className="text-gray-700 leading-relaxed">
              We organize various cultural events, festivals, and celebrations to keep our 
              Marwari traditions alive and pass them on to the next generation.
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
};


