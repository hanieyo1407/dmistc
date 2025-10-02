import express from 'express';
import authRoutes from './authRoutes.js';
import projectRoutes from './projectRoutes.js';
import userRoutes from './userRoutes.js';
import eventRoutes from './eventRoutes.js';
import adminRoutes from './adminRoutes.js';
import resourceRoutes from './resourceRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/admin', adminRoutes);
router.use('/resources', resourceRoutes);

export default router;
