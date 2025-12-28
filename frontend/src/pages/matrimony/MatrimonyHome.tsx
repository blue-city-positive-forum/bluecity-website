import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '../../components/layout/Layout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES, MEMBERSHIP_PRICE, MATRIMONY_PRICE } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';

export const MatrimonyHome: React.FC = () => {
  const { isAuthenticated, isApproved, isMember } = useAuth();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-blue-city-text mb-4">
            Find Your <span className="text-gradient">Perfect Match</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting Jodhpuri families in Ahmedabad for meaningful relationships
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* For Members */}
          <Card className="p-8 border-2 border-blue-city-primary relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge variant="success">Best Value</Badge>
            </div>
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold text-blue-city-text mb-2">
              For Members
            </h3>
            <div className="text-5xl font-bold text-blue-city-primary mb-4">
              FREE
            </div>
            <p className="text-gray-600 mb-6">
              Create unlimited matrimony profiles at no cost when you become a lifetime member
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Unlimited profile creation</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Browse all matrimony listings</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Priority support</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>All community benefits</span>
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
          </Card>

          {/* For Non-Members */}
          <Card className="p-8">
            <div className="text-4xl mb-4">👤</div>
            <h3 className="text-2xl font-bold text-blue-city-text mb-2">
              For Non-Members
            </h3>
            <div className="text-5xl font-bold text-blue-city-accent mb-4">
              {formatCurrency(MATRIMONY_PRICE)}
            </div>
            <p className="text-gray-600 mb-6">
              Create individual matrimony profiles with a one-time payment per profile
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Pay per profile created</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Profile visible to all members</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Edit and manage your profile</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Access to your own profile listings</span>
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
          </Card>
        </div>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-city-text mb-8 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-city-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-city-primary">1</span>
              </div>
              <h3 className="font-bold text-blue-city-text mb-2">Register & Login</h3>
              <p className="text-sm text-gray-600">
                Create an account and wait for admin approval
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-city-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-city-primary">2</span>
              </div>
              <h3 className="font-bold text-blue-city-text mb-2">Create Profile</h3>
              <p className="text-sm text-gray-600">
                Fill in details, upload photos, and submit
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-city-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-city-primary">3</span>
              </div>
              <h3 className="font-bold text-blue-city-text mb-2">Make Payment</h3>
              <p className="text-sm text-gray-600">
                Complete payment if required (free for members)
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-city-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-city-primary">4</span>
              </div>
              <h3 className="font-bold text-blue-city-text mb-2">Find Matches</h3>
              <p className="text-sm text-gray-600">
                Browse profiles and connect with families
              </p>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <Card className="p-12 text-center bg-gradient-to-r from-blue-city-primary to-blue-city-accent text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Perfect Match?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join hundreds of families who found their life partners through our community
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            {isAuthenticated && isApproved ? (
              <>
                <Button size="lg" variant="secondary" onClick={() => navigate(ROUTES.MATRIMONY_CREATE)}>
                  Create Your Profile
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-city-primary" onClick={() => navigate(ROUTES.MATRIMONY_LIST)}>
                  Browse Profiles
                </Button>
              </>
            ) : (
              <Button size="lg" variant="secondary" onClick={() => navigate(ROUTES.LOGIN)}>
                Get Started
              </Button>
            )}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

