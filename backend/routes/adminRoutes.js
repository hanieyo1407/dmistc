import express from 'express';
const router = express.Router();
import {
    getUsers,
    updateUserStatus,
    createEvent,
    updateEvent,
    deleteEvent,
    getProjectsAdmin,
    updateProjectStatus,
} from '../controllers/adminController.js';
import { protect, admin, executive } from '../middleware/authMiddleware.js';

// User Management (Admin only)
router.route('/users').get(protect, admin, getUsers);
router.route('/users/:id/status').put(protect, admin, updateUserStatus);

// Event Management (Executive/Admin)
router.route('/events')
    .post(protect, executive, createEvent);
router.route('/events/:id')
    .put(protect, executive, updateEvent)
    .delete(protect, executive, deleteEvent);

// Project Management (Executive/Admin)
router.route('/projects').get(protect, executive, getProjectsAdmin);
router.route('/projects/:id/status').put(protect, executive, updateProjectStatus);

export default router;
