import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { getImageUrl } from '../utils/urlConfig';

const MedicineCard = ({ medicine }) => {
    const { user } = useContext(AuthContext);
    const { addToCart, cartItems } = useContext(CartContext);
    const discountPrice = (medicine.price * 0.8).toFixed(2);
    const [added, setAdded] = useState(false);
    const imageUrl = getImageUrl(medicine.imageUrl);

    const addToCartHandler = async (e) => {
        e.preventDefault();
        const existing = cartItems.find(x => x.medicine === medicine._id);
        const newQty = existing ? Math.min(existing.qty + 1, medicine.stock) : 1;

        await addToCart(medicine, newQty);

        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <div className="ecommerce-card p-3 flex flex-col h-full group relative bg-white">
            {/* Discount Tag */}
            <div className="absolute top-3 left-0 bg-pharmacy-accent text-white text-[10px] font-bold px-2 py-1 rounded-r-md z-10 shadow-sm">
                20% OFF
            </div>

            {/* Essential Tag */}
            {medicine.isEssential && (
                <div className="absolute top-3 right-3 bg-rose-100 text-rose-600 border border-rose-200 text-[9px] font-bold px-2 py-0.5 rounded-md z-10">
                    Essential
                </div>
            )}

            <Link to={`/medicine/${medicine._id}`} className="block relative overflow-hidden rounded-md mb-3 bg-white flex items-center justify-center p-2 h-36 mt-4">
                <img
                    src={imageUrl}
                    alt={medicine.name}
                    className="max-h-full object-contain group-hover:scale-[1.05] transition-transform duration-300"
                />
            </Link>

            <div className="flex-grow flex flex-col">
                <h3 className="text-sm font-semibold text-pharmacy-dark mb-1 line-clamp-2 leading-snug group-hover:text-pharmacy-primary transition-colors">
                    <Link to={`/medicine/${medicine._id}`}>{medicine.name}</Link>
                </h3>
                <p className="text-xs text-gray-500 mb-3 truncate">By MomPharmacy</p>

                <div className="mt-auto space-y-2">
                    <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[11px] text-gray-400 line-through">MRP ₹{medicine.price?.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-lg font-extrabold text-pharmacy-dark">₹{discountPrice}</span>
                    </div>

                    <Link to={`/medicine/${medicine._id}`} className="w-full flex items-center justify-center gap-2 border border-gray-300 text-pharmacy-dark hover:border-pharmacy-primary hover:text-pharmacy-primary hover:bg-pharmacy-secondary font-bold py-2 rounded-md transition-all text-sm">
                        View Details
                    </Link>

                    <button
                        onClick={addToCartHandler}
                        disabled={medicine.stock === 0}
                        className={`w-full flex items-center justify-center gap-1.5 font-bold py-2 rounded-md transition-all text-sm ${added
                            ? 'bg-emerald-500 text-white'
                            : medicine.stock === 0
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-pharmacy-primary text-white hover:bg-teal-700'
                            }`}
                    >
                        <ShoppingCart size={13} />
                        {added ? 'Added!' : medicine.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MedicineCard;
