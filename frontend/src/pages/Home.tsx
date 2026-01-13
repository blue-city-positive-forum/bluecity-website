import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Events } from '../components/Events';
import { Gallery } from '../components/Gallery';
import { Stories } from '../components/Stories';
import { CTA } from '../components/CTA';

export const Home: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <About />
      {/* <Events /> */}
      {/* <Gallery /> */}
      <Stories />
      <CTA />
    </Layout>
  );
};

