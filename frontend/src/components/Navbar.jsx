import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { ShoppingCart, User, Search, MapPin, Tag, ChevronDown, FileText } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="bg-pharmacy-primary text-white text-xs py-1 text-center hidden md:block font-medium tracking-wide">
                Save up to 25% on medicines. Free Delivery on orders over ₹499.
            </div>

            <div className="container mx-auto px-4 py-3 xl:py-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                    <Link to="/" className="flex items-center gap-2 group">
                        <img
                            src="https://res.cloudinary.com/dqxhjnhrt/image/upload/v1775039343/mompharmacy_logo_xynnbe.jpg"
                            alt="Mom Pharmacy"
                            className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                        <span className="text-2xl font-extrabold text-pharmacy-dark tracking-tight">
                            Mom<span className="text-pharmacy-primary">Pharmacy</span>
                        </span>
                    </Link>

                    {/* <div className="hidden lg:flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition border border-transparent hover:border-gray-200">
                        <div className="bg-pharmacy-secondary p-1.5 rounded-full text-pharmacy-primary">
                            <MapPin size={16} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-medium leading-tight">Deliver to</span>
                            <span className="text-sm font-bold text-pharmacy-dark flex items-center gap-1 leading-tight">Select Pincode <ChevronDown size={14} /></span>
                        </div>
                    </div> */}
                </div>

                {/* Search Bar - Center */}
                <div className="flex-grow max-w-2xl hidden md:block">
                    <form onSubmit={handleSearch} className="flex relative w-full">
                        <input
                            type="text"
                            placeholder="Search for medicines, health products and more"
                            className="w-full pl-5 pr-12 py-2.5 rounded-l-md border border-gray-300 focus:outline-none focus:border-pharmacy-primary shadow-sm text-sm"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <button type="submit" className="bg-pharmacy-primary text-white px-6 rounded-r-md hover:bg-[#0c6b66] transition shadow-sm">
                            <Search size={20} />
                        </button>
                    </form>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-5 xl:gap-8">
                    <Link to="/upload" className="hidden xl:flex items-center gap-2 text-pharmacy-dark hover:text-pharmacy-primary font-medium text-sm transition">
                        <FileText size={18} /> Upload Prescription
                    </Link>

                    {/* <Link to="/" className="hidden lg:flex items-center gap-2 text-pharmacy-dark hover:text-pharmacy-primary font-medium text-sm transition">
                        <Tag size={18} /> Offers
                    </Link> */}

                    {user ? (
                        <div className="group relative">
                            <button className="flex items-center gap-2 font-bold text-sm text-pharmacy-dark hover:text-pharmacy-primary transition bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
                                <User size={18} /> {user.name} <ChevronDown size={14} />
                            </button>
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                <div className="p-3 border-b border-gray-100 bg-gray-50 rounded-t-md">
                                    <p className="text-xs text-gray-500 font-medium">Signed in as</p>
                                    <p className="font-bold text-pharmacy-dark truncate">{user.email}</p>
                                </div>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pharmacy-secondary hover:text-pharmacy-primary font-medium">Admin Panel</Link>
                                )}
                                <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pharmacy-secondary hover:text-pharmacy-primary font-medium">My Orders</Link>
                                <div className="border-t border-gray-100 my-1"></div>
                                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium rounded-b-md">Logout</button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="flex items-center gap-2 font-medium text-sm text-pharmacy-dark hover:text-pharmacy-primary transition">
                            <User size={20} /> Login / Signup
                        </Link>
                    )}

                    <Link to="/cart" className="flex items-center gap-2 text-white bg-pharmacy-dark hover:bg-gray-800 px-5 py-2.5 rounded-md font-bold text-sm transition shadow-md relative">
                        <ShoppingCart size={18} /> Cart
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Mobile Search - Visible only on small screens */}
            <div className="md:hidden px-4 pb-3">
                <form onSubmit={handleSearch} className="flex relative w-full">
                    <input
                        type="text"
                        placeholder="Search medicines..."
                        className="w-full pl-4 pr-12 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:border-pharmacy-primary shadow-sm"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type="submit" className="absolute right-3 top-3 text-pharmacy-primary">
                        <Search size={18} />
                    </button>
                </form>
            </div>
        </nav>
    );
};

export default Navbar;
