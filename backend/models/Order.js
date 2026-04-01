import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            medicine: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Medicine',
            },
        }
    ],
    shippingAddress: {
        fullName: { type: String, required: false },
        address: { type: String, required: false },
        phone: { type: String, required: false },
    },
    itemsPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['Awaiting Payment', 'Placed', 'Processing', 'Delivered'], default: 'Placed' }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
