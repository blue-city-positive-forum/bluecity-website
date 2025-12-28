import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/Button';

const useInView = () => {
  const [isInView, setIsInView] = React.useState(false);
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isInView };
};

const events = [
  {
    title: 'Diwali Celebration 2025',
    date: 'October 24, 2025',
    time: '6:00 PM - 10:00 PM',
    location: 'Community Hall, Bodakdev',
    status: 'Upcoming',
  },
  {
    title: 'Holi Milan 2026',
    date: 'March 14, 2026',
    time: '10:00 AM - 2:00 PM',
    location: 'Green Meadows, SG Highway',
    status: 'Upcoming',
  },
  {
    title: 'Monthly Family Meetup',
    date: 'Every 2nd Sunday',
    time: '5:00 PM - 8:00 PM',
    location: 'Various Locations',
    status: 'Upcoming',
  },
  {
    title: 'Rajasthani Folk Night',
    date: 'January 15, 2026',
    time: '7:00 PM - 11:00 PM',
    location: 'The Grand Bhagwati, SG Road',
    status: 'Done',
  },
];

export const Events: React.FC = () => {
  const { ref, isInView } = useInView();
  const { t } = useTranslation();

  return (
    <section id="events" ref={ref} className="py-20 md:py-32 bg-blue-city-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold text-blue-city-accent uppercase tracking-wider mb-2">
            {t('home.events.subtitle')}
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-blue-city-text mb-4">
            {t('home.events.title')} <span className="text-gradient">{t('home.events.titleHighlight')}</span>
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('home.events.description')}
          </p>
        </motion.div>

        {/* Events Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-city-primary to-blue-city-accent text-white">
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold uppercase tracking-wider">{t('home.events.tableHeaders.eventName')}</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold uppercase tracking-wider">{t('home.events.tableHeaders.date')}</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold uppercase tracking-wider">{t('home.events.tableHeaders.time')}</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold uppercase tracking-wider">{t('home.events.tableHeaders.location')}</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold uppercase tracking-wider">{t('home.events.tableHeaders.status')}</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                      className="border-b border-blue-city-secondary/30 hover:bg-blue-city-background transition-colors"
                    >
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <div className="font-semibold text-blue-city-text text-sm md:text-base">{event.title}</div>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-gray-700 text-xs md:text-sm whitespace-nowrap">{event.date}</td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-gray-700 text-xs md:text-sm whitespace-nowrap">{event.time}</td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-gray-700 text-xs md:text-sm">{event.location}</td>
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <span className={`inline-flex px-2 md:px-3 py-1 rounded-full text-xs font-semibold ${
                          event.status === 'Upcoming' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {event.status === 'Upcoming' ? t('home.events.statusUpcoming') : t('home.events.statusDone')}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Button size="lg" variant="primary">
            {t('home.events.viewAllEvents')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};




