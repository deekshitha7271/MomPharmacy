import express from 'express';
import { addPrescription, getPrescriptions, getMyPrescriptions, updatePrescriptionStatus } from '../controllers/prescriptionController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addPrescription).get(protect, admin, getPrescriptions);
router.route('/my').get(protect, getMyPrescriptions);
router.route('/:id/status').put(protect, admin, updatePrescriptionStatus);

export default router;
