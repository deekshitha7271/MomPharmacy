import { useEffect, useContext, useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Trash2, ChevronRight, ShoppingCart, Loader2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Cart = () => {
    const { user } = useContext(AuthContext);
    const { cartItems, loading, addToCart, removeFromCart, updateQty, clearCart } = useContext(CartContext);
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const searchQty = location.search ? Number(location.search.split('=')[1]) : 1;

    const [addingItem, setAddingItem] = useState(false);

    // Handle initial /cart/:id addition
    useEffect(() => {
        if (id) {
            const fetchAndAdd = async () => {
                setAddingItem(true);
                try {
                    const { data } = await axios.get(`/api/medicines/${id}`);
                    await addToCart(data, searchQty);
                    navigate('/cart', { replace: true });
                } catch (error) {
                    console.error(error);
                } finally {
                    setAddingItem(false);
                }
            };
            fetchAndAdd();
        }
    }, [id, searchQty, navigate, addToCart]);

    const checkoutHandler = () => {
        if (!user) {
            navigate('/login?redirect=checkout');
        } else {
            navigate('/checkout');
        }
    };

    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const totalValue = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

    if (loading || addingItem) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <Loader2 size={40} className="text-pharmacy-primary animate-spin" />
                <p className="text-gray-500 font-medium">Updating your cart...</p>
            </div>
        );
    }

    return (
        <div className="py-6 max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium">
                <Link to="/" className="hover:text-pharmacy-primary">Home</Link> <ChevronRight size={14} />
                <span className="text-pharmacy-dark">Cart</span>
            </div>

            <h1 className="text-2xl font-bold text-pharmacy-dark mb-6 tracking-tight">Items in your Cart</h1>

            {cartItems.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-16 text-center shadow-sm">
                    <div className="w-24 h-24 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6">
                        <ShoppingCart size={40} className="text-gray-300" />
                    </div>
                    <p className="text-xl text-pharmacy-dark font-bold mb-2">Your cart is empty</p>
                    <p className="text-gray-500 mb-8 text-sm">Looks like you haven't added anything to your cart yet.</p>
                    <Link to="/" className="btn-primary px-8 py-3 inline-block font-bold">Return to Shop</Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-2/3 flex flex-col gap-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                            <h2 className="font-bold border-b border-gray-100 pb-3 mb-4 text-pharmacy-dark">{totalItems} Items</h2>
                            {cartItems.map(item => (
                                <div key={item.medicine} className="flex gap-4 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition px-2 rounded-md">
                                    <div className="w-20 h-20 border border-gray-100 rounded p-1 flex-shrink-0 bg-white">
                                        <Link to={`/medicine/${item.medicine}`}><img src={item.image} alt={item.name} className="w-full h-full object-contain" /></Link>
                                    </div>
                                    <div className="flex-grow flex flex-col justify-between">
                                        <div className="flex justify-between">
                                            <Link to={`/medicine/${item.medicine}`} className="font-medium text-pharmacy-dark hover:text-pharmacy-primary text-sm line-clamp-2 md:w-3/4 leading-snug">{item.name}</Link>
                                            <button onClick={() => removeFromCart(item.medicine)} className="text-gray-400 hover:text-red-500 transition p-1">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center gap-3">
                                                <select
                                                    value={item.qty}
                                                    onChange={(e) => updateQty(item.medicine, Number(e.target.value))}
                                                    className="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-pharmacy-primary font-medium bg-white"
                                                >
                                                    {[...Array(item.stock).keys()].map(x => (
                                                        <option key={x + 1} value={x + 1}>Qty {x + 1}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <span className="font-bold text-pharmacy-dark md:text-lg">₹{item.price.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/3">
                        <div className="bg-white border border-gray-200 rounded-lg p-5 sticky top-24 shadow-sm">
                            <h2 className="font-bold mb-4 border-b border-gray-100 pb-3 text-pharmacy-dark">Bill Details</h2>
                            <div className="space-y-3 text-sm border-b border-gray-100 pb-4 mb-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Item Total</span>
                                    <span className="font-medium text-pharmacy-dark">₹{totalValue}</span>
                                </div>
                                <div className="flex justify-between text-emerald-600 font-medium">
                                    <span>Delivery Fee</span>
                                    <span>FREE</span>
                                </div>
                                <div className="flex justify-between text-pharmacy-primary font-medium">
                                    <span>Prescription Discount</span>
                                    <span>Applied</span>
                                </div>
                            </div>
                            <div className="flex justify-between font-extrabold text-lg mb-6 text-pharmacy-dark">
                                <span>To Pay</span>
                                <span>₹{totalValue}</span>
                            </div>
                            <button
                                onClick={checkoutHandler}
                                className="w-full btn-primary py-3.5 text-base flex justify-center items-center gap-2 font-extrabold"
                            >
                                Proceed to Checkout <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
