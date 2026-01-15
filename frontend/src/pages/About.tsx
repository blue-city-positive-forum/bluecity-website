import React from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { useInView } from '../hooks/useInView';

export const About: React.FC = () => {
  const { ref, isInView } = useInView();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Hero Image - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl mb-8 md:mb-12 aspect-video md:aspect-[21/9]"
        >
          <img
            src={`${import.meta.env.BASE_URL}about.jpeg`}
            alt="Blue City Positive Forum Community"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
            <div className="p-4 md:p-8 lg:p-12 text-white">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3">
                About <span className="text-blue-300">Blue City Positive Forum</span>
              </h1>
              <p className="text-sm md:text-lg lg:text-xl text-blue-100">
                Connecting the hearts of Jodhpur in Ahmedabad since 2015
              </p>
            </div>
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
        </motion.div>

        {/* Story Section */}
        <section ref={ref} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-blue-city-text mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong className="text-blue-city-primary">Blue City Positive Forum</strong> was born out of a simple yet powerful idea: 
                  to create a home away from home for families from Jodhpur living in Ahmedabad.
                </p>
                <p>
                  Founded in 2015 by a small group of Jodhpuri families who missed the warmth and cultural richness of their hometown, 
                  our community has grown into a vibrant family of over 500 members. We are united by our shared heritage, values, 
                  and the desire to preserve and celebrate our Marwari roots.
                </p>
                <p>
                  What started as informal monthly gatherings has evolved into a well-organized community that hosts regular events, 
                  celebrates festivals together, and provides support to members in times of need. We've helped families connect, 
                  facilitated marriages, supported education initiatives, and created lasting bonds that transcend generations.
                </p>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-gradient-to-br from-blue-city-primary/10 to-blue-city-accent/10">
              <div className="w-16 h-16 rounded-full bg-blue-city-primary/20 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-city-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blue-city-text mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To preserve and promote Marwari culture and traditions while providing a supportive community 
                network for Jodhpuri families in Ahmedabad. We aim to create opportunities for cultural exchange, 
                social connection, and mutual support among our members.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-blue-city-secondary/30 to-blue-city-primary/10">
              <div className="w-16 h-16 rounded-full bg-blue-city-accent/20 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-city-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blue-city-text mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be the premier community organization for Jodhpuri families in Ahmedabad, where every member 
                feels connected to their roots while thriving in their new home. We envision a future where our 
                culture and traditions are passed down seamlessly to the next generation.
              </p>
            </Card>
          </div>
        </section>

        {/* What We Do */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-city-text mb-8 text-center">What We Do</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-blue-city-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-city-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-city-text mb-3">Cultural Events</h3>
              <p className="text-gray-600">
                Regular celebrations of Diwali, Holi, Gangaur, and other traditional festivals with the entire community.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-blue-city-accent/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-city-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-city-text mb-3">Family Support</h3>
              <p className="text-gray-600">
                A strong support network for families, helping with everything from settling in Ahmedabad to finding suitable matches.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-blue-city-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-city-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-city-text mb-3">Youth Programs</h3>
              <p className="text-gray-600">
                Cultural workshops, language classes, and activities to help young members connect with their heritage.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-blue-city-accent/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-city-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-city-text mb-3">Business Network</h3>
              <p className="text-gray-600">
                Connecting entrepreneurs and professionals within our community for mutual growth and collaboration.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-blue-city-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-city-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-city-text mb-3">Matrimony Services</h3>
              <p className="text-gray-600">
                Helping families find suitable matches within our community, keeping traditions alive.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-blue-city-accent/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-city-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-city-text mb-3">Community Welfare</h3>
              <p className="text-gray-600">
                Supporting members during difficult times and celebrating their successes together as a family.
              </p>
            </Card>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <Card className="p-8 bg-gradient-to-r from-blue-city-primary to-blue-city-accent text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Heritage</h3>
                <p className="text-sm text-blue-100">
                  Preserving and celebrating our rich Marwari culture and traditions
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Unity</h3>
                <p className="text-sm text-blue-100">
                  Building strong bonds and supporting each other like family
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Growth</h3>
                <p className="text-sm text-blue-100">
                  Encouraging personal and professional development of all members
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Excellence</h3>
                <p className="text-sm text-blue-100">
                  Striving for excellence in everything we do as a community
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="text-4xl font-bold text-blue-city-primary mb-2">500+</div>
              <div className="text-gray-600">Active Members</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-4xl font-bold text-blue-city-accent mb-2">50+</div>
              <div className="text-gray-600">Events Organized</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-4xl font-bold text-blue-city-primary mb-2">100+</div>
              <div className="text-gray-600">Families Connected</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-4xl font-bold text-blue-city-accent mb-2">10+</div>
              <div className="text-gray-600">Years Strong</div>
            </Card>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="text-center">
          <Card className="p-12 bg-blue-city-background border-2 border-blue-city-primary">
            <h2 className="text-3xl font-bold text-blue-city-text mb-4">
              Become Part of Our Family
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join us in celebrating our culture and building lasting connections
            </p>
            <a href="/joinus">
              <button className="px-8 py-4 bg-blue-city-primary text-white font-semibold rounded-2xl hover:bg-blue-700 transition-colors shadow-lg">
                Join Blue City Positive Forum
              </button>
            </a>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

