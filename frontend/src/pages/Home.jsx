import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import MedicineCard from '../components/MedicineCard';
import Loader from '../components/Loader';
import { getHealthIcon } from '../data/healthIcons.jsx';
import { Search, Zap, FileText, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { getImageUrl } from '../utils/urlConfig';

const Home = () => {
    const [trending, setTrending] = useState([]);
    const [categories, setCategories] = useState([]);
    const [healthConditions, setHealthConditions] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollContainer = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [medRes, catRes, condRes] = await Promise.all([
                    axios.get('/api/medicines?featured=true'),
                    axios.get('/api/categories'),
                    axios.get('/api/health-conditions')
                ]);
                setTrending(medRes.data);
                setCategories(catRes.data);
                setHealthConditions(condRes.data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const scroll = (direction) => {
        if (scrollContainer.current) {
            const { current } = scrollContainer;
            const { scrollLeft, scrollWidth, clientWidth } = current;
            const scrollAmount = direction === 'left' ? -400 : 400;

            if (direction === 'right' && scrollLeft + clientWidth >= scrollWidth - 10) {
                current.scrollTo({ left: 0, behavior: 'smooth' });
            } else if (direction === 'left' && scrollLeft <= 10) {
                current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="pb-16 -mt-8">
            <div className="bg-[#10847e] py-16 mb-12 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 text-white mb-10 md:mb-0 text-left">
                        <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight text-white drop-shadow-sm">
                            Taking care of your health,
                            <span className="block mt-2 md:mt-3">just like Mom does.</span>
                        </h1>
                        <p className="text-teal-50 mb-8 text-lg max-w-xl opacity-90 drop-shadow-sm">
                            Order your medicines online safely. Upload prescriptions, get fast home delivery, and access expert healthcare advice.
                        </p>
                    </div>

                    <div className="md:w-1/2 flex justify-center md:justify-end relative h-64 md:h-[22rem] w-full max-w-md drop-shadow-2xl">
                        {/* Mother & Baby Continuous Line Art */}
                        <svg viewBox="0 0 600 450" className="w-full h-full text-white" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            {/* The continuous drawing path */}
                            <path
                                className="animate-draw"
                                d="M -50,380 L 380,380 C 180,380 100,100 300,80 C 350,75 380,110 370,140 C 370,140 380,120 400,120 C 360,170 340,210 380,240 C 360,220 380,180 400,150 C 420,100 480,50 530,90 C 580,130 600,200 520,290 C 450,370 380,380 380,380 M 380,380 C 400,360 440,350 480,360 M 360,240 C 320,240 300,280 340,300 M 400,120 C 440,100 480,140 460,180"
                            />
                            {/* Caring Love Heart - Live Drawing */}
                            <path
                                className="animate-draw-heart stroke-rose-200/60"
                                d="M 500,200 C 500,180 470,180 470,200 C 470,230 500,250 500,250 C 500,250 530,230 530,200 C 530,180 500,180 500,200"
                                strokeWidth="3"
                            />
                            {/* Delayed elements (eyes/facial details) to draw after main body */}
                            <path className="animate-draw-delayed" d="M 345,160 Q 355,165 365,160" strokeWidth="3.5" />
                            <path className="animate-draw-delayed" d="M 445,140 Q 435,145 425,140" strokeWidth="3.5" />
                        </svg>
                    </div>
                </div>

                {/* Decorative background circle */}
                <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-white opacity-5 rounded-full transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
            </div>

            <div className="container mx-auto px-6 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 -mt-16 sm:-mt-24 lg:-mt-28">

                    <Link to="/upload" className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-teal-50 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group">
                        <div className="bg-teal-50 text-[#10847e] p-4 rounded-full group-hover:bg-[#10847e] group-hover:text-white transition-colors duration-300">
                            <FileText size={32} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-[19px] font-bold text-gray-800 mb-2 group-hover:text-[#10847e] transition-colors">Order via Prescription</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-1">Have a doctor's rx? Upload it and we will process your medicine order.</p>
                            <span className="text-[#10847e] font-semibold text-sm mt-3 flex items-center justify-center sm:justify-start gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                                Upload Now <ChevronRight size={16} />
                            </span>
                        </div>
                    </Link>

                    <Link to="/emergency" className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-orange-50 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group">
                        <div className="bg-orange-50 text-orange-500 p-4 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                            <Zap size={32} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-[19px] font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors">Emergency Delivery</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-1">Need it urgently? Fast 2-hour delivery for essential medications.</p>
                            <span className="text-orange-500 font-semibold text-sm mt-3 flex items-center justify-center sm:justify-start gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                                Shop Essentials <ChevronRight size={16} />
                            </span>
                        </div>
                    </Link>

                    <Link to="/orders" className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-blue-50 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group">
                        <div className="bg-blue-50 text-blue-500 p-4 rounded-full group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                            <CheckCircle2 size={32} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-[19px] font-bold text-gray-800 mb-2 group-hover:text-blue-500 transition-colors">Track Your Orders</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-1">Track the live status of your current and past pharmacy orders.</p>
                            <span className="text-blue-500 font-semibold text-sm mt-3 flex items-center justify-center sm:justify-start gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                                My Orders <ChevronRight size={16} />
                            </span>
                        </div>
                    </Link>

                </div>

                {/* Browse by Health Conditions */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Shop by Health Needs</h2>
                    {healthConditions.length === 0 ? (
                        <p className="text-gray-400 text-sm py-6 border border-dashed rounded-xl text-center">No health conditions added yet. Admin can add them.</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                            {healthConditions.map(({ _id, tag, label, icon }) => (
                                <Link
                                    key={_id}
                                    to={`/condition/${tag}`}
                                    className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-3 md:p-4 hover:shadow-md hover:border-[#10847e] transition-all duration-200 group"
                                >
                                    <div className="w-10 h-10 flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                                        {getHealthIcon(icon)}
                                    </div>
                                    <span className="text-[13px] font-semibold text-gray-700 group-hover:text-[#10847e] leading-snug">{label}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Shop by Category */}
                <div className="mb-20 relative">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Shop by Categories</h2>
                    <div className="relative group/carousel">
                        {/* Scroll Left Button */}
                        <button onClick={() => scroll('left')} className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-[#10847e] text-white p-3 rounded-full shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity disabled:opacity-0 hover:bg-[#0d6e69] hidden md:block">
                            <ChevronLeft size={20} />
                        </button>

                        {/* Scroll Container */}
                        <div ref={scrollContainer} className="flex gap-5 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 pt-2 px-2 -mx-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {categories.map((cat) => (
                                <Link to={`/category/${encodeURIComponent(cat.name)}`} key={cat._id} className="min-w-[170px] md:min-w-[210px] bg-white border border-gray-100 shadow-sm rounded-xl py-8 px-5 flex flex-col items-center justify-between cursor-pointer hover:shadow-md hover:border-gray-200 transition-all duration-300 text-center group snap-start">
                                    <div className="w-28 h-28 md:w-36 md:h-36 mb-6 flex items-center justify-center">
                                        <img src={getImageUrl(cat.imageUrl)} alt={cat.name} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    <span className="font-semibold text-[14px] md:text-[16px] text-gray-800 leading-snug group-hover:text-[#10847e]">{cat.name}</span>
                                </Link>
                            ))}
                            {categories.length === 0 && (
                                <div className="text-gray-400 w-full col-span-full py-10">No categories found. Admin can add categories.</div>
                            )}
                        </div>

                        {/* Scroll Right Button */}
                        <button onClick={() => scroll('right')} className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-[#10847e] text-white p-3 rounded-full shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity disabled:opacity-0 hover:bg-[#0d6e69] hidden md:block">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Trending Vault */}
                <div className="mb-10">
                    <div className="flex justify-between items-end mb-4 pb-2 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
                        <Link to="/medicines" className="hidden sm:block text-blue-600 hover:underline text-sm">View All Products</Link>
                    </div>

                    {trending.length === 0 ? (
                        <p className="text-gray-500 text-sm py-8 text-center border border-dashed rounded">No featured products yet. Admin can mark products as featured.</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {trending.map(med => (
                                <MedicineCard key={med._id} medicine={med} />
                            ))}
                        </div>
                    )}
                    <div className="mt-8 text-center sm:hidden">
                        <Link to="/medicines" className="btn-outline inline-block w-full py-3 text-sm font-semibold">View All Products</Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;
