import api from './api';
import type { Event, EventFormData } from '../types/event.types';

export const eventService = {
  // Get all events
  getEvents: async (isCompleted?: boolean): Promise<Event[]> => {
    const params = new URLSearchParams();
    if (isCompleted !== undefined) {
      params.append('isCompleted', isCompleted.toString());
    }
    
    const response = await api.get<{ events: Event[] }>(
      `/events?${params.toString()}`
    );
    return response.data.events;
  },

  // Get single event
  getEvent: async (id: string): Promise<Event> => {
    const response = await api.get<{ event: Event }>(`/events/${id}`);
    return response.data.event;
  },

  // Create event (Admin only)
  createEvent: async (data: EventFormData): Promise<Event> => {
    const response = await api.post<{ event: Event }>('/events', data);
    return response.data.event;
  },

  // Update event (Admin only)
  updateEvent: async (id: string, data: Partial<EventFormData>): Promise<Event> => {
    const response = await api.put<{ event: Event }>(`/events/${id}`, data);
    return response.data.event;
  },

  // Delete event (Admin only)
  deleteEvent: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/events/${id}`);
    return response.data;
  },
};

