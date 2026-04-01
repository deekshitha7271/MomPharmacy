import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#1e293b] text-white pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="flex flex-col gap-6">
                        <Link to="/" className="flex items-center gap-2 group">
                            <img
                                src="https://res.cloudinary.com/dqxhjnhrt/image/upload/v1775039343/mompharmacy_logo_xynnbe.jpg"
                                alt="Mom Pharmacy"
                                className="h-12 w-auto object-contain rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
                            />
                            <span className="text-2xl font-bold tracking-tight text-white italic">
                                Mom <span className="text-[#14A396]">Pharmacy</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Your trusted partner in health. We provide authentic medicines and care just like a mother does. Fast, reliable, and always here for you.
                        </p>
                        <div className="flex gap-4">

                            <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-[#14A396] hover:text-white transition-all text-gray-400">
                                <Link to="https://www.linkedin.com/company/mompharmacy/">
                                    <Linkedin size={18} />
                                </Link>

                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 relative inline-block">
                            Quick Links
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#14A396] rounded-full"></span>
                        </h3>
                        <ul className="space-y-4 text-sm">
                            <li><Link to="/medicines" className="text-gray-400 hover:text-[#14A396] transition-colors">Browse Medicines</Link></li>
                            <li><Link to="/upload" className="text-gray-400 hover:text-[#14A396] transition-colors">Upload Prescription</Link></li>
                            <li><Link to="/emergency" className="text-gray-400 hover:text-[#14A396] transition-colors">Emergency Service</Link></li>
                            <li><Link to="/orders" className="text-gray-400 hover:text-[#14A396] transition-colors">Track Orders</Link></li>
                        </ul>
                    </div>

                    {/* Customer Support */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 relative inline-block">
                            Support
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#14A396] rounded-full"></span>
                        </h3>
                        <ul className="space-y-4 text-sm">
                            <li><Link to="/support/how-to-order" className="text-gray-400 hover:text-[#14A396] transition-colors">How to Order</Link></li>
                            <li><Link to="/support/terms" className="text-gray-400 hover:text-[#14A396] transition-colors">Terms of Service</Link></li>
                            <li><Link to="/support/privacy" className="text-gray-400 hover:text-[#14A396] transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/support/refund-policy" className="text-gray-400 hover:text-[#14A396] transition-colors">Refund Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 relative inline-block">
                            Contact Us
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#14A396] rounded-full"></span>
                        </h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-[#14A396] mt-0.5" />
                                <span className="text-gray-400">Madhapur, Hyderabad, Telangana, India</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-[#14A396]" />
                                <span className="text-gray-400">+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-[#14A396]" />
                                <span className="text-gray-400">mompharmacy.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs">
                        &copy; {new Date().getFullYear()} Mom Pharmacy. All rights reserved.
                    </p>
                    <div className="flex gap-6 grayscale opacity-50">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="Paypal" className="h-5" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
