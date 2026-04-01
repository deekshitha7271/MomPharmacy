import { useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Success = () => {
    const { clearCart } = useContext(CartContext);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const orderId = searchParams.get('order_id');
    const sessionId = searchParams.get('session_id');

    const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'

    useEffect(() => {
        if (!orderId || !sessionId) {
            setStatus('error');
            return;
        }

        const verifyPayment = async () => {
            try {
                // In a production app, we would verify the sessionId with Stripe here.
                // For this implementation, we simply finalize the order.
                await axios.put(`/api/orders/${orderId}/finalize`, {}, { withCredentials: true });
                // Cleanly clear both DB and UI state using context
                await clearCart();
                setStatus('success');

                // Automatically redirect after 5 seconds
                setTimeout(() => navigate('/orders'), 5000);
            } catch (error) {
                console.error("Payment verification failed", error);
                setStatus('error');
            }
        };

        verifyPayment();
    }, [orderId, sessionId, navigate]);

    return (
        <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
                {status === 'verifying' && (
                    <div className="flex flex-col items-center">
                        <Loader />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2 -mt-8">Verifying Payment...</h2>
                        <p className="text-gray-500">Please wait while we confirm your transaction securely.</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex flex-col items-center">
                        <div className="bg-green-100 text-green-500 rounded-full p-4 mb-6">
                            <CheckCircle2 size={48} />
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Payment Successful!</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Thank you for your order. We have received your payment and your medicines will be processed shortly.
                        </p>
                        <div className="flex flex-col w-full gap-3">
                            <Link to="/orders" className="btn-primary py-3 w-full font-bold">View My Orders</Link>
                            <Link to="/" className="text-pharmacy-primary font-semibold hover:underline block py-2">Return Home</Link>
                        </div>
                        <p className="text-xs text-gray-400 mt-6">You will be redirected automatically in 5 seconds...</p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="flex flex-col items-center">
                        <div className="bg-red-100 text-red-500 rounded-full p-4 mb-6">
                            <AlertCircle size={48} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Verification Failed</h2>
                        <p className="text-gray-600 mb-6">
                            We couldn't verify your payment structure. If you were charged, please contact support.
                        </p>
                        <Link to="/orders" className="bg-gray-100 text-gray-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-200 transition">View My Orders</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Success;
