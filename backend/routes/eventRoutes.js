import express from 'express';
const router = express.Router();
import {
    getEvents,
    getEventById,
    registerForEvent
} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(getEvents);
router.route('/:id').get(getEventById);
router.route('/:id/register').post(protect, registerForEvent);

export default router;
