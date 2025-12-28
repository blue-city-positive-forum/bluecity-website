import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { ROUTES } from '../utils/constants';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout showFooter={false}>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <div className="text-9xl font-bold text-gradient mb-4 animate-pulse">
            404
          </div>
          <h2 className="text-4xl font-bold text-blue-city-text mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button onClick={() => navigate(ROUTES.HOME)} size="lg">
              Go to Homepage
            </Button>
            <Button variant="outline" onClick={() => navigate(-1)} size="lg">
              Go Back
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">Here are some helpful links instead:</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => navigate(ROUTES.ABOUT)}
                className="text-blue-city-primary hover:underline"
              >
                About Us
              </button>
              <button
                onClick={() => navigate(ROUTES.EVENTS)}
                className="text-blue-city-primary hover:underline"
              >
                Events
              </button>
              <button
                onClick={() => navigate(ROUTES.GALLERY)}
                className="text-blue-city-primary hover:underline"
              >
                Gallery
              </button>
              <button
                onClick={() => navigate(ROUTES.CONTACT)}
                className="text-blue-city-primary hover:underline"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

