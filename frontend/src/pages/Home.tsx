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
        {/* Continuous decorative background blobs that span all sections */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top area blobs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-city-secondary/30 rounded-full blur-3xl"></div>
          <div className="absolute top-20 left-0 w-[450px] h-[450px] bg-blue-city-accent/20 rounded-full blur-3xl"></div>
          
          {/* Middle area blobs */}
          <div className="absolute top-[30%] right-1/4 w-[550px] h-[550px] bg-blue-city-accent/25 rounded-full blur-3xl"></div>
          <div className="absolute top-[40%] left-10 w-[500px] h-[500px] bg-blue-city-secondary/25 rounded-full blur-3xl"></div>
          
          {/* Lower middle blobs */}
          <div className="absolute top-[60%] right-0 w-[480px] h-[480px] bg-blue-city-accent/30 rounded-full blur-3xl"></div>
          <div className="absolute top-[70%] left-1/4 w-[450px] h-[450px] bg-blue-city-secondary/20 rounded-full blur-3xl"></div>
          
          {/* Bottom area blobs */}
          <div className="absolute bottom-20 right-1/3 w-[500px] h-[500px] bg-blue-city-accent/25 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-blue-city-secondary/30 rounded-full blur-3xl"></div>
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

