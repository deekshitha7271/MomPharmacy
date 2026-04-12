import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import OptimizedImage from '../components/OptimizedImage';
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { getImageUrl } from '../utils/urlConfig';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [medicine, setMedicine] = useState({});
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMedicine = async () => {
            try {
                const { data } = await axios.get(`/api/medicines/${id}`);
                setMedicine(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching medicine", error);
                setLoading(false);
            }
        };
        fetchMedicine();
    }, [id]);

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`);
    };

    if (loading) return <Loader />;

    const discountPrice = medicine.price ? (medicine.price * 0.8).toFixed(2) : '0.00';

    return (
        <div className="py-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col md:flex-row mb-8">

                {/* Left: Image Viewer */}
                <div className="md:w-5/12 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 bg-white">
                    <OptimizedImage
                        src={getImageUrl(medicine.imageUrl)}
                        alt={medicine.name}
                        className="w-full min-h-[300px] flex items-center justify-center"
                        imageClassName="max-w-full h-auto object-contain max-h-96"
                    />
                </div>

                {/* Right: Product Info */}
                <div className="md:w-7/12 p-8 flex flex-col">
                    <div className="mb-6 border-b border-gray-100 pb-6">
                        <h1 className="text-2xl font-bold text-pharmacy-dark mb-2 tracking-tight">{medicine.name}</h1>
                        <p className="text-sm text-pharmacy-primary font-medium mb-4 cursor-pointer hover:underline">By MomPharmacy Essentials</p>
                        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 w-max px-3 py-1 rounded text-xs font-bold border border-emerald-100">
                            <ShieldCheck size={14} /> Doctor Recommended
                        </div>
                    </div>

                    {/* Price Section */}
                    <div className="mb-6 border-b border-gray-100 pb-6">
                        <div className="flex items-end gap-3 mb-1">
                            <span className="text-3xl font-extrabold text-pharmacy-dark">₹{discountPrice}</span>
                            <span className="text-sm text-gray-400 line-through mb-1.5">MRP ₹{medicine.price?.toFixed(2)}</span>
                            <span className="text-sm font-bold text-pharmacy-accent mb-1.5">20% OFF</span>
                        </div>
                        <p className="text-xs text-gray-400">Inclusive of all taxes</p>
                    </div>

                    {/* Cart Section */}
                    <div className="mb-8 flex flex-col sm:flex-row gap-4">
                        {medicine.stock > 0 ? (
                            <div className="flex w-full gap-4 max-w-sm">
                                <select
                                    value={qty}
                                    onChange={(e) => setQty(Number(e.target.value))}
                                    className="border border-gray-300 rounded-md px-4 py-3 font-medium focus:ring-1 focus:ring-pharmacy-primary outline-none bg-white w-24"
                                >
                                    <option value="" disabled>Qty</option>
                                    {[...Array(Math.min(medicine.stock, 10)).keys()].map(x => (
                                        <option key={x + 1} value={x + 1}>Qty {x + 1}</option>
                                    ))}
                                </select>
                                <button onClick={addToCartHandler} className="btn-primary flex-grow py-3 text-lg font-bold">Add to Cart</button>
                            </div>
                        ) : (
                            <div className="text-red-600 font-bold bg-red-50 px-4 py-3 rounded-md w-full max-w-sm text-center border border-red-100">Currently Out of Stock</div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600"><Truck size={18} className="text-pharmacy-primary" /> Free Delivery</div>
                        <div className="flex items-center gap-2 text-sm text-gray-600"><RotateCcw size={18} className="text-pharmacy-primary" /> 7 Days Return</div>
                    </div>
                </div>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h2 className="text-xl font-bold text-pharmacy-dark border-b border-gray-100 pb-3 mb-4">Product Details</h2>
                <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{medicine.description}</p>

                <h3 className="font-semibold text-gray-800 mb-2">Usage & Precautions</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{medicine.usage || "Use as directed by a healthcare professional. Keep out of reach of children."}</p>
            </div>
        </div>
    );
};

export default ProductDetails;
