import { Request, Response } from 'express';
import Event from '../models/Event';
import logger from '../utils/logger';

export const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = new Event({
      ...req.body,
      createdBy: (req.user as any)?._id,
    });

    await event.save();

    logger.info(`New event created: ${event.title}`);

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: { event },
    });
  } catch (error) {
    logger.error('Create event error:', error);
    res.status(500).json({ success: false, message: 'Failed to create event' });
  }
};

export const getEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const filter: any = { isPublished: true };
    if (status) filter.status = status;

    const events = await Event.find(filter)
      .limit(parseInt(limit as string))
      .skip((parseInt(page as string) - 1) * parseInt(limit as string))
      .sort({ startDate: -1 });

    const total = await Event.countDocuments(filter);

    res.json({
      success: true,
      data: {
        events,
        pagination: {
          total,
          page: parseInt(page as string),
          pages: Math.ceil(total / parseInt(limit as string)),
        },
      },
    });
  } catch (error) {
    logger.error('Get events error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch events' });
  }
};

export const getEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'name');

    if (!event) {
      res.status(404).json({ success: false, message: 'Event not found' });
      return;
    }

    res.json({ success: true, data: { event } });
  } catch (error) {
    logger.error('Get event error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch event' });
  }
};

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      res.status(404).json({ success: false, message: 'Event not found' });
      return;
    }

    res.json({ success: true, message: 'Event updated', data: { event } });
  } catch (error) {
    logger.error('Update event error:', error);
    res.status(500).json({ success: false, message: 'Failed to update event' });
  }
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      res.status(404).json({ success: false, message: 'Event not found' });
      return;
    }

    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    logger.error('Delete event error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete event' });
  }
};

