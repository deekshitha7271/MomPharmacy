import Stripe from 'stripe';
import Order from '../models/Order.js';

// The user provided the same key for both PK and SK. We will use it since it's just a test environment, but ideally it should be sk_test_...
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc Create a stripe checkout session
// @route POST /api/stripe/create-checkout-session
// @access Private
export const createCheckoutSession = async (req, res) => {
    try {
        const { orderId } = req.body;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Create line items for Stripe Checkout
        const lineItems = order.orderItems.map((item) => ({
            price_data: {
                // Minimum amount for INR is 50.00 (5000 paise). The unit is paise. 1 INR = 100 paise.
                currency: 'inr',
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.qty,
        }));

        // Add Tax as a separate line item since we calculated it globally
        if (order.taxPrice > 0) {
            lineItems.push({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: 'Tax & Fees',
                    },
                    unit_amount: Math.round(order.taxPrice * 100),
                },
                quantity: 1,
            });
        }

        // Enforce Stripe's minimum 50 INR requirement
        if (order.totalPrice < 50) {
            const surcharge = 50 - order.totalPrice;
            lineItems.push({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: 'Minimum Processing Surcharge',
                        description: 'Stripe requires a transaction minimum of ₹50.00'
                    },
                    unit_amount: Math.round(surcharge * 100),
                },
                quantity: 1,
            });
        }

        // The URL of the frontend
        // Assuming dev frontend runs on localhost:5173
        const origin = req.headers.origin || 'http://localhost:5173';

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: lineItems,
            success_url: `${origin}/success?order_id=${order._id}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/orders`,
            client_reference_id: order._id.toString(),
            customer_email: req.user.email,
        });

        res.json({ id: session.id, url: session.url });
    } catch (error) {
        console.error('Stripe error:', error);
        res.status(500).json({ message: 'Failed to create stripe session', error: error.message });
    }
};
