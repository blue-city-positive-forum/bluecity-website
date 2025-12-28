import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '../../utils/constants';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-blue-city-background flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link to={ROUTES.HOME} className="flex items-center gap-3">
              <img 
                src={`${import.meta.env.BASE_URL}bluecity_logo_nobg.png`}
                alt="Blue City Parivar Logo" 
                className="h-14 w-14 object-contain"
              />
              <h1 className="text-3xl font-bold text-gradient">Blue City Parivar</h1>
            </Link>
            {title && (
              <div className="mt-6">
                <h2 className="text-2xl font-bold text-blue-city-text">
                  {title}
                </h2>
                {subtitle && (
                  <p className="mt-2 text-sm text-gray-600">
                    {subtitle}
                  </p>
                )}
              </div>
            )}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {children}
          </motion.div>
        </div>
      </div>

      {/* Right side - Image/Brand */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-city-primary via-blue-city-accent to-blue-city-primary">
          <div className="absolute inset-0 bg-pattern opacity-30" />
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="text-center text-white space-y-6">
              <div className="flex justify-center mb-8">
                <img 
                  src={`${import.meta.env.BASE_URL}bluecity_logo_nobg.png`}
                  alt="Blue City Parivar Logo" 
                  className="h-32 w-32 object-contain drop-shadow-2xl"
                />
              </div>
              <h2 className="text-4xl font-bold">
                Welcome to Our Community
              </h2>
              <p className="text-xl opacity-90 max-w-md mx-auto">
                Connecting families from Jodhpur living in Ahmedabad
              </p>
              <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto pt-8">
                <div>
                  <div className="text-4xl font-bold">500+</div>
                  <div className="text-sm opacity-80 mt-1">Members</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">50+</div>
                  <div className="text-sm opacity-80 mt-1">Events</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">10+</div>
                  <div className="text-sm opacity-80 mt-1">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

