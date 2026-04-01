import Cart from '../models/Cart.js';

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.medicine');
        res.json(cart ? cart.items : []);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const syncCart = async (req, res) => {
    const { items } = req.body;
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = new Cart({ user: req.user._id, items });
        } else {
            // Simple merge: add items from guest cart that don't exist in DB
            items.forEach(guestItem => {
                const exist = cart.items.find(x => x.medicine.toString() === guestItem.medicine);
                if (exist) {
                    exist.qty = guestItem.qty; // or merge qty, but overwrite is simpler
                } else {
                    cart.items.push(guestItem);
                }
            });
        }
        await cart.save();
        const updatedCart = await Cart.findOne({ user: req.user._id }).populate('items.medicine');
        res.json(updatedCart.items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addItem = async (req, res) => {
    const { medicineId, qty } = req.body;
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [{ medicine: medicineId, qty }] });
        } else {
            const exist = cart.items.find(x => x.medicine.toString() === medicineId);
            if (exist) {
                exist.qty = qty;
            } else {
                cart.items.push({ medicine: medicineId, qty });
            }
        }
        await cart.save();
        res.json({ message: 'Cart updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateItemQty = async (req, res) => {
    const { medicineId, qty } = req.body;
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        const exist = cart.items.find(x => x.medicine.toString() === medicineId);
        if (exist) {
            exist.qty = qty;
            await cart.save();
            res.json({ message: 'Quantity updated' });
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeItem = async (req, res) => {
    const { medicineId } = req.params;
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (cart) {
            cart.items = cart.items.filter(x => x.medicine.toString() !== medicineId);
            await cart.save();
        }
        res.json({ message: 'Item removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (cart) {
            cart.items = [];
            await cart.save();
        }
        res.json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin populate user cart
export const adminAddItems = async (req, res) => {
    const { userId, items } = req.body; // items: [{ medicine: medicineId, qty }]
    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items });
        } else {
            // Overwrite or append? The user said "adds the items to cart", so probably append/merge.
            items.forEach(item => {
                const exist = cart.items.find(x => x.medicine.toString() === item.medicine);
                if (exist) {
                    exist.qty += item.qty;
                } else {
                    cart.items.push(item);
                }
            });
        }
        await cart.save();
        res.json({ message: 'User cart populated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
