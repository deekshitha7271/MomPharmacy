import express from 'express';
import { getCart, syncCart, addItem, updateItemQty, removeItem, clearCart, adminAddItems } from '../controllers/cartController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, getCart)
    .post(protect, addItem)
    .put(protect, updateItemQty);

router.route('/sync').post(protect, syncCart);
router.route('/clear').post(protect, clearCart);
router.route('/:medicineId').delete(protect, removeItem);

// Admin populate user cart
router.route('/admin-add').post(protect, admin, adminAddItems);

export default router;
