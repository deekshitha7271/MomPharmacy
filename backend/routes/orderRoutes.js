import express from 'express';
import { addOrderItems, getMyOrders, adminCreateOrder, finalizeOrder } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/admin-create').post(protect, admin, adminCreateOrder);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id/finalize').put(protect, finalizeOrder);

export default router;
