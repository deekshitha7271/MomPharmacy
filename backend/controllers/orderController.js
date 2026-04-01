import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

export const addOrderItems = async (req, res) => {
    const { orderItems, shippingAddress, itemsPrice, taxPrice, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400).json({ message: 'No order items' });
    } else {
        try {
            const order = new Order({
                user: req.user._id,
                orderItems,
                shippingAddress,
                itemsPrice,
                taxPrice,
                totalPrice
            });

            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }
    }
};

// @desc Admin creates an order for a user (assisted cart)
// @route POST /api/orders/admin-create
// @access Private/Admin
export const adminCreateOrder = async (req, res) => {
    try {
        const { userId, orderItems, itemsPrice, taxPrice, totalPrice } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        const order = new Order({
            user: userId,
            orderItems,
            itemsPrice,
            taxPrice,
            totalPrice,
            status: 'Awaiting Payment'
        });

        const createdOrder = await order.save();

        // Automatically clear the user's cart in the database when an admin creates an order (e.g. from a prescription)
        const cart = await Cart.findOne({ user: userId });
        if (cart) {
            cart.items = [];
            await cart.save();
        }

        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc Finalize an awaiting payment order
// @route PUT /api/orders/:id/finalize
// @access Private
export const finalizeOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.status = 'Processing';
            const updatedOrder = await order.save();

            // Automatically clear the user's cart in the database upon successful finalization
            const cart = await Cart.findOne({ user: order.user });
            if (cart) {
                cart.items = [];
                await cart.save();
            }

            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
