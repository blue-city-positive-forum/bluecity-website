import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../components/layout/Layout';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES, MEMBERSHIP_PRICE, MATRIMONY_PRICE } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';

export const MatrimonyHome: React.FC = () => {
  const { isAuthenticated, isApproved, isMember } = useAuth();
  const navigate = useNavigate();
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t('pages.matrimonyHome.title')}
              </h1>
              <p className="text-xl text-blue-100 mb-2">
                {t('pages.matrimonyHome.subtitle')}
              </p>
              <p className="text-lg text-white font-semibold">
                {t('pages.matrimonyHome.tagline')}
              </p>
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
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('pages.matrimonyHome.intro')}
            </p>
            
            <ul className="space-y-2 mb-12">
              {t('pages.matrimonyHome.features', { returnObjects: true }).map((feature: string, index: number) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-blue-city-primary mt-1">•</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Pricing Options */}
            <div className="border-t border-gray-200 pt-8 mb-10">
              <h2 className="text-2xl font-bold text-blue-city-text mb-8 text-center">
                Membership Options
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* For Members */}
                <div className="border-2 border-blue-city-primary rounded-lg p-6 relative">
                  <div className="absolute top-4 right-4">
                    <Badge variant="success">Best Value</Badge>
                  </div>
                  <h3 className="text-xl font-bold text-blue-city-text mb-2">
                    For Members
                  </h3>
                  <div className="text-4xl font-bold text-blue-city-primary mb-4">
                    FREE
                  </div>
                  <p className="text-gray-600 mb-6">
                    Create unlimited matrimony profiles at no cost when you become a lifetime member
                  </p>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500">✓</span>
                      <span>Unlimited profile creation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500">✓</span>
                      <span>Browse all matrimony listings</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500">✓</span>
                      <span>Priority support</span>
                    </li>
                  </ul>
                  {isMember ? (
                    <Button className="w-full" onClick={() => navigate(ROUTES.MATRIMONY_CREATE)}>
                      Create Your Profile
                    </Button>
                  ) : (
                    <Button className="w-full" onClick={() => navigate(ROUTES.JOIN_US)}>
                      Become a Member - {formatCurrency(MEMBERSHIP_PRICE)}
                    </Button>
                  )}
                </div>

                {/* For Non-Members */}
                <div className="border-2 border-gray-300 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-blue-city-text mb-2">
                    For Non-Members
                  </h3>
                  <div className="text-4xl font-bold text-blue-city-accent mb-4">
                    {formatCurrency(MATRIMONY_PRICE)}
                  </div>
                  <p className="text-gray-600 mb-6">
                    Create individual matrimony profiles with a one-time payment per profile
                  </p>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500">✓</span>
                      <span>Pay per profile created</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500">✓</span>
                      <span>Profile visible to all members</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500">✓</span>
                      <span>Edit and manage your profile</span>
                    </li>
                  </ul>
                  {isAuthenticated && isApproved ? (
                    <Button className="w-full" variant="outline" onClick={() => navigate(ROUTES.MATRIMONY_CREATE)}>
                      Create Profile - {formatCurrency(MATRIMONY_PRICE)}
                    </Button>
                  ) : (
                    <Button className="w-full" variant="outline" onClick={() => navigate(ROUTES.LOGIN)}>
                      Login to Create Profile
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-blue-city-text mb-8 text-center">
                How It Works
              </h2>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="w-16 h-16 bg-blue-city-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-blue-city-primary">1</span>
                  </div>
                  <h3 className="font-bold text-blue-city-text mb-2">Register & Login</h3>
                  <p className="text-sm text-gray-600">
                    Create an account and wait for admin approval
                  </p>
                </div>

                <div>
                  <div className="w-16 h-16 bg-blue-city-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-blue-city-primary">2</span>
                  </div>
                  <h3 className="font-bold text-blue-city-text mb-2">Create Profile</h3>
                  <p className="text-sm text-gray-600">
                    Fill in details, upload photos, and submit
                  </p>
                </div>

                <div>
                  <div className="w-16 h-16 bg-blue-city-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-blue-city-primary">3</span>
                  </div>
                  <h3 className="font-bold text-blue-city-text mb-2">Make Payment</h3>
                  <p className="text-sm text-gray-600">
                    Complete payment if required (free for members)
                  </p>
                </div>

                <div>
                  <div className="w-16 h-16 bg-blue-city-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-blue-city-primary">4</span>
                  </div>
                  <h3 className="font-bold text-blue-city-text mb-2">Find Matches</h3>
                  <p className="text-sm text-gray-600">
                    Browse profiles and connect with families
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="border-t border-gray-200 pt-8 mt-8 text-center">
              <h2 className="text-2xl font-bold text-blue-city-text mb-4">
                Ready to Find Your Perfect Match?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Join hundreds of families who found their life partners through our community
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                {isAuthenticated && isApproved ? (
                  <>
                    <Button size="lg" onClick={() => navigate(ROUTES.MATRIMONY_CREATE)}>
                      Create Your Profile
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => navigate(ROUTES.MATRIMONY_LIST)}>
                      Browse Profiles
                    </Button>
                  </>
                ) : (
                  <Button size="lg" onClick={() => navigate(ROUTES.LOGIN)}>
                    Get Started
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};
