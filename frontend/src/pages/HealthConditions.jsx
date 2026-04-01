import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import { ShoppingCart, ChevronRight, ArrowLeft } from 'lucide-react';
import { getHealthIcon } from '../data/healthIcons.jsx';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const HealthConditions = () => {
    const { user } = useContext(AuthContext);
    const { addToCart, cartItems } = useContext(CartContext);
    const { tag } = useParams();
    const [medicines, setMedicines] = useState([]);
    const [conditionLabel, setConditionLabel] = useState('');
    const [loading, setLoading] = useState(true);
    const [addedIds, setAddedIds] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [medRes, condRes] = await Promise.all([
                    axios.get(`/api/medicines?tag=${tag}`),
                    axios.get('/api/health-conditions')
                ]);
                setMedicines(medRes.data);
                const found = condRes.data.find(c => c.tag === tag);
                setConditionLabel(found ? found.label : tag);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [tag]);

    const addToCartHandler = async (med) => {
        const existing = cartItems.find(x => x.medicine === med._id);
        const newQty = existing ? Math.min(existing.qty + 1, med.stock) : 1;

        await addToCart(med, newQty);

        setAddedIds(prev => ({ ...prev, [med._id]: true }));
        setTimeout(() => setAddedIds(prev => ({ ...prev, [med._id]: false })), 1500);
    };

    return (
        <div className="py-8 max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium">
                <Link to="/" className="hover:text-pharmacy-primary flex items-center gap-1">
                    <ArrowLeft size={14} /> Home
                </Link>
                <ChevronRight size={14} />
                <span className="text-pharmacy-dark">{conditionLabel}</span>
            </div>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-pharmacy-dark">{conditionLabel}</h1>
                    <p className="text-sm text-gray-500 mt-1">Medicines & products for {conditionLabel.toLowerCase()}</p>
                </div>
                <Link to="/cart" className="flex items-center gap-2 text-sm font-semibold text-pharmacy-primary border border-pharmacy-primary rounded-lg px-4 py-2 hover:bg-pharmacy-secondary transition">
                    <ShoppingCart size={16} /> View Cart
                </Link>
            </div>

            {loading ? (
                <Loader />
            ) : medicines.length === 0 ? (
                <div className="text-center py-20 bg-white border border-dashed border-gray-200 rounded-xl">
                    <p className="text-xl font-bold text-gray-700 mb-2">No medicines found</p>
                    <p className="text-gray-500 text-sm mb-6">No products have been tagged with this condition yet. Admin can tag medicines from the dashboard.</p>
                    <Link to="/" className="btn-primary px-6 py-2.5 inline-block text-sm">Back to Home</Link>
                </div>
            ) : (
                <>
                    <p className="text-sm text-gray-500 mb-5">{medicines.length} product{medicines.length !== 1 ? 's' : ''} found</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {medicines.map(med => {
                            const discountPrice = (med.price * 0.8).toFixed(2);
                            const isAdded = addedIds[med._id];
                            return (
                                <div key={med._id} className="ecommerce-card p-3 flex flex-col h-full group relative bg-white">
                                    <div className="absolute top-3 left-0 bg-pharmacy-accent text-white text-[10px] font-bold px-2 py-1 rounded-r-md z-10 shadow-sm">
                                        20% OFF
                                    </div>
                                    {med.isEssential && (
                                        <div className="absolute top-3 right-3 bg-rose-100 text-rose-600 border border-rose-200 text-[9px] font-bold px-2 py-0.5 rounded-md z-10">
                                            Essential
                                        </div>
                                    )}
                                    <Link to={`/medicine/${med._id}`} className="block overflow-hidden rounded-md mb-3 bg-white flex items-center justify-center p-2 h-36 mt-4">
                                        <img src={med.imageUrl} alt={med.name} className="max-h-full object-contain group-hover:scale-[1.05] transition-transform duration-300" />
                                    </Link>
                                    <div className="flex-grow flex flex-col">
                                        <h3 className="text-sm font-semibold text-pharmacy-dark mb-1 line-clamp-2 leading-snug">
                                            <Link to={`/medicine/${med._id}`}>{med.name}</Link>
                                        </h3>
                                        <p className="text-xs text-gray-500 mb-3 truncate">By MomPharmacy</p>
                                        <div className="mt-auto space-y-2">
                                            <div><span className="text-[11px] text-gray-400 line-through">MRP ₹{med.price?.toFixed(2)}</span></div>
                                            <div><span className="text-lg font-extrabold text-pharmacy-dark">₹{discountPrice}</span></div>
                                            <button
                                                onClick={() => addToCartHandler(med)}
                                                disabled={med.stock === 0}
                                                className={`w-full flex items-center justify-center gap-1.5 font-bold py-2 rounded-md transition-all text-sm ${isAdded
                                                    ? 'bg-emerald-500 text-white'
                                                    : med.stock === 0
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'bg-pharmacy-primary text-white hover:bg-teal-700'
                                                    }`}
                                            >
                                                <ShoppingCart size={14} />
                                                {isAdded ? 'Added!' : med.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default HealthConditions;
