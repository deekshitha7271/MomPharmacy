import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import OptimizedImage from '../components/OptimizedImage';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get('/api/orders/myorders', { withCredentials: true });
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user, navigate]);

    const handlePayment = async (orderId) => {
        try {
            const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
            const { data } = await axios.post('/api/stripe/create-checkout-session', { orderId }, config);
            window.location.href = data.url;
        } catch (error) {
            console.error(error);
            alert('Failed to initiate payment. Please try again.');
        }
    };

    return (
        <div className="py-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-extrabold text-pharmacy-dark mb-8">Your Orders</h1>
            {loading ? (
                <Loader />
            ) : orders.length === 0 ? (
                <div className="premium-card p-12 text-center">
                    <p className="text-xl text-gray-500 mb-8">You have no orders yet.</p>
                    <Link to="/medicines" className="btn-primary px-8 py-3 rounded-full font-bold inline-block">Start Shopping</Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="premium-card p-0 overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="space-y-1">
                                    <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">Order ID</p>
                                    <p className="text-sm font-mono font-bold text-gray-800">{order._id}</p>
                                </div>
                                <div className="flex flex-col items-start md:items-end gap-1">
                                    <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">Status</p>
                                    <span className={`px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm ${order.status === 'Processing' ? 'bg-emerald-100 text-emerald-700' :
                                        order.status === 'Awaiting Payment' ? 'bg-amber-100 text-amber-700' : 'bg-teal-50 text-teal-700'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="space-y-4 mb-6">
                                    {order.orderItems.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
                                            <div className="w-16 h-16 bg-gray-50 rounded-lg p-2 border border-gray-100">
                                                <OptimizedImage src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-gray-800">{item.name}</p>
                                                <p className="text-xs text-gray-400 font-medium">Qty: {item.qty}</p>
                                            </div>
                                            <p className="font-bold text-gray-800">₹{(item.price * item.qty).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col md:flex-row justify-between items-end md:items-center pt-4 border-t border-gray-100">
                                    <div className="mb-4 md:mb-0">
                                        <p className="text-sm font-bold text-pharmacy-dark">Total Charged</p>
                                        <p className="text-2xl font-black text-[#10847e]">₹{order.totalPrice.toFixed(2)}</p>
                                    </div>
                                    {order.status === 'Awaiting Payment' && (
                                        <button onClick={() => handlePayment(order._id)} className="btn-primary px-10 py-3 rounded-full text-sm font-bold shadow-lg hover:shadow-teal-200/50 transition-all">
                                            Pay Now
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
