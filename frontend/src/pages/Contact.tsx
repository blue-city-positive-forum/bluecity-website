import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { useUIStore } from '../store/uiStore';
import { contactSchema } from '../utils/validators';
import { motion } from 'framer-motion';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const showAlert = useUIStore((state) => state.showAlert);
  const { t } = useTranslation();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // For now, just simulate submission
      // In production, you'd send this to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showAlert('Message sent successfully! We\'ll get back to you soon.', 'success');
      form.reset();
    } catch (error) {
      showAlert('Failed to send message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-city-primary to-blue-city-accent text-white py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-blue-100 text-sm uppercase tracking-widest mb-4 font-semibold"
              >
                Contact
              </motion.p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {t('contact.title')}
              </h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="w-24 h-1 bg-white mx-auto rounded-full mb-4"
              />
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                {t('contact.subtitle')}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Membership Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-6xl mx-auto px-4 pt-12 pb-8"
        >
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-city-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h2 className="text-3xl font-bold text-blue-city-text">
                {t('contact.membershipForm')}
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              {t('contact.membershipFormDesc')}
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLScIrAgybK2Bnr4F_i63SEoNNOW6uEQ6I-Tz_rfaM0GzhpjBPQ/viewform?usp=header', '_blank')}
              className="inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              {t('contact.fillMembershipForm')}
            </Button>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto py-12 px-4">
          <div className="border-t border-gray-200 pt-8"></div>
          <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-blue-city-text mb-6">{t('contact.sendMessage')}</h2>
              
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Input
                  label={t('contact.name')}
                  {...form.register('name')}
                  error={form.formState.errors.name?.message}
                  required
                />

                <Input
                  label={t('contact.email')}
                  type="email"
                  {...form.register('email')}
                  error={form.formState.errors.email?.message}
                  required
                />

                <Input
                  label={t('contact.phone')}
                  type="tel"
                  {...form.register('phone')}
                  error={form.formState.errors.phone?.message}
                  required
                />

                <Input
                  label={t('contact.subject')}
                  {...form.register('subject')}
                  error={form.formState.errors.subject?.message}
                  required
                />

                <Textarea
                  label={t('contact.message')}
                  rows={6}
                  {...form.register('message')}
                  error={form.formState.errors.message?.message}
                  required
                  maxLength={500}
                  showCharCount
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <Spinner size="sm" color="white" className="mr-2" />
                      {t('contact.sending')}
                    </span>
                  ) : (
                    t('contact.sendMessage')
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-blue-city-text mb-6">{t('contact.contactInfo')}</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-city-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-city-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-city-text mb-1">{t('contact.email')}</h3>
                    <a href="mailto:bluecityahmedabad@gmail.com" className="text-gray-600 hover:text-blue-city-primary transition-colors">
                      bluecityahmedabad@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-city-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-city-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-city-text mb-1">{t('contact.phone')}</h3>
                    <a href="tel:+919876543210" className="text-gray-600 hover:text-blue-city-primary transition-colors">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-city-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-city-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-city-text mb-1">{t('contact.location')}</h3>
                    <p className="text-gray-600" style={{ whiteSpace: 'pre-line' }}>
                      {t('contact.locationText')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-city-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-city-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-city-text mb-1">{t('contact.whatsapp')}</h3>
                    <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-city-primary transition-colors">
                      {t('contact.whatsappText')}
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            {/* Social Media */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-blue-city-text mb-6">{t('contact.followUs')}</h2>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                  <span className="text-xl font-bold">f</span>
                </a>
                <a href="#" className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center text-white hover:bg-pink-700 transition-colors">
                  <span className="text-xl font-bold">IG</span>
                </a>
                <a href="#" className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white hover:bg-green-700 transition-colors">
                  <span className="text-xl font-bold">WA</span>
                </a>
              </div>
            </Card>

            {/* Office Hours */}
            <Card className="p-8 bg-blue-city-secondary/20">
              <h3 className="font-bold text-blue-city-text mb-4">📅 {t('contact.responseTimes')}</h3>
              <p className="text-gray-700 text-sm">
                {t('contact.responseTimesText')}
              </p>
            </Card>
          </motion.div>
        </div>
        </div>
      </div>
    </Layout>
  );
};

