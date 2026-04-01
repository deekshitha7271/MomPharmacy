import express from 'express';
import { getHealthConditions, createHealthCondition, deleteHealthCondition, updateHealthCondition } from '../controllers/healthConditionController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getHealthConditions).post(protect, admin, createHealthCondition);
router.route('/:id').put(protect, admin, updateHealthCondition).delete(protect, admin, deleteHealthCondition);

export default router;
