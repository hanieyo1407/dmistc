import express from 'express';
const router = express.Router();
import {
    getResources,
    createResource,
    deleteResource,
} from '../controllers/resourceController.js';
import { protect, executive } from '../middleware/authMiddleware.js';

router.route('/')
    .get(getResources) // Can be public or protected with `protect`
    .post(protect, executive, createResource);

router.route('/:id')
    .delete(protect, executive, deleteResource);

export default router;
