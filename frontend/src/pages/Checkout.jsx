import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { PackageCheck } from 'lucide-react';

const Checkout = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const cartKey = user ? `cartItems_${user._id}` : 'cartItems_guest';
    const cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
    const totalPrice = itemsPrice + taxPrice;

    if (!user) {
        navigate('/login');
        return null;
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
            // 1. Create Order in backend (Status: Awaiting Payment)
            const { data: order } = await axios.post('/api/orders', {
                orderItems: cartItems,
                shippingAddress: { fullName, address, phone },
                itemsPrice,
                taxPrice,
                totalPrice
            }, config);

            // 2. Clear local cart
            localStorage.removeItem(cartKey);

            // 3. Create Stripe Checkout Session
            const { data: stripeSession } = await axios.post('/api/stripe/create-checkout-session', {
                orderId: order._id
            }, config);

            // 4. Redirect to Stripe Payment Page
            window.location.href = stripeSession.url;

        } catch (error) {
            console.error(error);
            alert('Payment initialization failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="py-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            <div className="bg-white border rounded p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 border-b pb-2">Shipping Details</h2>
                <form onSubmit={submitHandler} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pharmacy-primary/50 outline-none transition" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                        <textarea className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pharmacy-primary/50 outline-none transition" value={address} onChange={(e) => setAddress(e.target.value)} required rows="3"></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input type="text" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pharmacy-primary/50 outline-none transition" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>

                    <div className="mt-6 bg-gray-50 p-6 rounded-xl border border-gray-100 mb-6">
                        <h3 className="font-bold mb-4 border-b border-gray-200 pb-2">Order Summary</h3>
                        <div className="flex justify-between mb-2"><span className="text-gray-600">Items:</span><span className="font-medium">₹{itemsPrice.toFixed(2)}</span></div>
                        <div className="flex justify-between mb-2"><span className="text-gray-600">Tax & Fees:</span><span className="font-medium">₹{taxPrice.toFixed(2)}</span></div>
                        <div className="flex justify-between font-bold text-xl mt-4 pt-4 border-t border-gray-200"><span className="text-pharmacy-dark">Total:</span><span className="text-pharmacy-primary">₹{totalPrice.toFixed(2)}</span></div>
                    </div>

                    <button type="submit" className="btn-primary py-4 text-lg w-full" disabled={loading}>
                        {loading ? 'Processing...' : 'Place Order'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
