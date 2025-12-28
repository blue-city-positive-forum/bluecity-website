import { Router } from 'express';
import * as eventController from '../controllers/event.controller';

const router = Router();

// Public routes (no authentication required)
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEventById);

export default router;

