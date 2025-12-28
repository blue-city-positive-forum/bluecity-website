import React, { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { Badge } from '../components/ui/Badge';
import { eventService } from '../services/eventService';
import { useUIStore } from '../store/uiStore';
import { formatDate } from '../utils/formatters';
import type { Event } from '../types/event.types';
import { motion } from 'framer-motion';

export const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const showAlert = useUIStore((state) => state.showAlert);

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      let fetchedEvents: Event[];
      if (filter === 'all') {
        fetchedEvents = await eventService.getEvents();
      } else {
        fetchedEvents = await eventService.getEvents(filter === 'completed');
      }
      setEvents(fetchedEvents);
    } catch (error) {
      showAlert('Failed to load events', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const isEventUpcoming = (event: Event) => {
    return new Date(event.date) > new Date() && !event.isCompleted;
  };

  const filteredEvents = (events || []).filter(event => {
    if (filter === 'upcoming') return isEventUpcoming(event);
    if (filter === 'completed') return !isEventUpcoming(event) || event.isCompleted;
    return true;
  });

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-blue-city-text mb-4">
            Our <span className="text-gradient">Events</span>
          </h1>
          <p className="text-xl text-gray-600">
            Join us in celebrating our culture and traditions
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8 space-x-4">
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
        </div>

        {/* Events List */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : filteredEvents.length === 0 ? (
          <Card className="p-12 text-center">
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
              {filter === 'all' && 'No events available.'}
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold text-blue-city-text">
                          {event.title}
                        </h3>
                        <Badge variant={isEventUpcoming(event) ? 'success' : 'default'}>
                          {isEventUpcoming(event) ? 'Upcoming' : 'Completed'}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-gray-600">
                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5 text-blue-city-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="font-medium">{formatDate(event.date, 'EEEE, MMMM d, yyyy')}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5 text-blue-city-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>

                    {isEventUpcoming(event) && (
                      <div className="text-center bg-blue-city-primary/10 rounded-lg p-4">
                        <div className="text-3xl font-bold text-blue-city-primary">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-sm text-gray-600 uppercase">
                          {new Date(event.date).toLocaleString('default', { month: 'short' })}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

