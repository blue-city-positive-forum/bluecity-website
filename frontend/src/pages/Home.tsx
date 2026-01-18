import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Gallery } from '../components/Gallery';
import { Stories } from '../components/Stories';
import { CTA } from '../components/CTA';

export const Home: React.FC = () => {
  return (
    <Layout>
      <Hero />
      {/* Continuous background wrapper for all content sections */}
      <div className="relative bg-white">
        {/* Optimized decorative background blobs - reduced from 8 to 4 for better mobile performance */}
        {/* These will be hidden on mobile devices via CSS (see index.css) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top area blob */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-city-secondary/25 rounded-full blur-3xl"></div>
          
          {/* Middle area blobs */}
          <div className="absolute top-[40%] left-0 w-[450px] h-[450px] bg-blue-city-accent/20 rounded-full blur-3xl"></div>
          
          {/* Lower area blob */}
          <div className="absolute top-[70%] right-1/4 w-[400px] h-[400px] bg-blue-city-secondary/20 rounded-full blur-3xl"></div>
          
          {/* Bottom area blob */}
          <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-blue-city-accent/25 rounded-full blur-3xl"></div>
        </div>
        
        {/* Content sections */}
        <div className="relative z-10">
          <About />
          {/* <Events /> */}
          <Gallery />
          <Stories />
          <CTA />
        </div>
      </div>
    </Layout>
  );
};

