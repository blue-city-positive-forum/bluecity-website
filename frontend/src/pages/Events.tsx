import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';

// Static event data
const staticEvents = [
  {
    id: '1',
    title: 'Diwali Celebration 2025',
    date: 'October 24, 2025',
    time: '6:00 PM - 10:00 PM',
    location: 'Community Hall, Bodakdev',
    status: 'Upcoming',
  },
  {
    id: '2',
    title: 'Holi Milan 2026',
    date: 'March 14, 2026',
    time: '10:00 AM - 2:00 PM',
    location: 'Green Meadows, SG Highway',
    status: 'Upcoming',
  },
  {
    id: '3',
    title: 'Monthly Family Meetup',
    date: 'Every 2nd Sunday',
    time: '5:00 PM - 8:00 PM',
    location: 'Various Locations',
    status: 'Upcoming',
  },
  {
    id: '4',
    title: 'Rajasthani Folk Night',
    date: 'January 15, 2026',
    time: '7:00 PM - 11:00 PM',
    location: 'The Grand Bhagwati, SG Road',
    status: 'Completed',
  },
  {
    id: '5',
    title: 'Teej Festival Celebration',
    date: 'August 18, 2025',
    time: '4:00 PM - 9:00 PM',
    location: 'Heritage Club, Satellite',
    status: 'Completed',
  },
  {
    id: '6',
    title: 'New Year Gathering 2025',
    date: 'January 1, 2025',
    time: '8:00 PM - 1:00 AM',
    location: 'The Fern Hotel, Ahmedabad',
    status: 'Completed',
  },
  {
    id: '7',
    title: 'Garba Night 2025',
    date: 'October 10, 2025',
    time: '7:00 PM - 11:00 PM',
    location: 'Garden Lawns, Prahlad Nagar',
    status: 'Completed',
  },
  {
    id: '8',
    title: 'Community Picnic',
    date: 'December 15, 2025',
    time: '10:00 AM - 5:00 PM',
    location: 'Sabarmati Riverfront',
    status: 'Upcoming',
  },
  {
    id: '9',
    title: 'Cultural Evening',
    date: 'November 22, 2025',
    time: '6:00 PM - 10:00 PM',
    location: 'Community Center, Vastrapur',
    status: 'Upcoming',
  },
  {
    id: '10',
    title: 'Independence Day Celebration',
    date: 'August 15, 2025',
    time: '9:00 AM - 12:00 PM',
    location: 'Community Hall, Bodakdev',
    status: 'Completed',
  },
];

export const Events: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');

  const filteredEvents = staticEvents.filter(event => {
    if (filter === 'upcoming') return event.status === 'Upcoming';
    if (filter === 'completed') return event.status === 'Completed';
    return true;
  });

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-city-primary to-blue-city-accent text-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Our Events
              </h1>
              <p className="text-xl text-blue-100">
                Join us in celebrating our culture and traditions
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-8 space-x-4"
          >
            <Button
              variant={filter === 'all' ? 'primary' : 'outline'}
              onClick={() => setFilter('all')}
            >
              All Events
            </Button>
            <Button
              variant={filter === 'upcoming' ? 'primary' : 'outline'}
              onClick={() => setFilter('upcoming')}
            >
              Upcoming
            </Button>
            <Button
              variant={filter === 'completed' ? 'primary' : 'outline'}
              onClick={() => setFilter('completed')}
            >
              Past Events
            </Button>
          </motion.div>

          {/* Events Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-city-primary to-blue-city-accent text-white">
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold uppercase tracking-wider">
                      Event Name
                    </th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map((event, idx) => (
                    <motion.tr
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + idx * 0.05 }}
                      className="border-b border-blue-city-secondary/30 hover:bg-blue-city-background transition-colors"
                    >
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <div className="font-semibold text-blue-city-text text-sm md:text-base">
                          {event.title}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-gray-700 text-xs md:text-sm whitespace-nowrap">
                        {event.date}
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-gray-700 text-xs md:text-sm whitespace-nowrap">
                        {event.time}
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-gray-700 text-xs md:text-sm">
                        {event.location}
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <span className={`inline-flex px-2 md:px-3 py-1 rounded-full text-xs font-semibold ${
                          event.status === 'Upcoming' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {event.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No Events Found
                </h3>
                <p className="text-gray-500">
                  {filter === 'upcoming' && 'No upcoming events scheduled at the moment.'}
                  {filter === 'completed' && 'No completed events to display.'}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};
