import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { User } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const redirect = new URLSearchParams(location.search).get('redirect') || '/';

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.post('/api/auth/login', { email, password }, config);
            login(data);

            // Migrate guest cart if it exists
            const guestCart = localStorage.getItem('cartItems_guest');
            if (guestCart && JSON.parse(guestCart).length > 0) {
                // If the user already had a cart from previous sessions, we are simply overwriting it 
                // with their current guest cart. You could merge them, but overwriting is simpler for now.
                localStorage.setItem(`cartItems_${data._id}`, guestCart);
                localStorage.removeItem('cartItems_guest');
                window.dispatchEvent(new Event('cartUpdated')); // update navbar cart count if applicable
            }

            navigate(redirect.startsWith('/') ? redirect : `/${redirect}`);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="flex justify-center flex-col items-center min-h-[60vh]">
            <div className="premium-card p-10 w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="bg-pharmacy-blue p-4 rounded-full text-pharmacy-primary">
                        <User size={32} />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
                <p className="text-gray-500 text-center mb-8">Login to continue caring for your loved ones.</p>

                {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">{error}</div>}

                <form onSubmit={submitHandler} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pharmacy-primary/50 outline-none transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pharmacy-primary/50 outline-none transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary mt-4 py-3 text-lg">Login</button>
                </form>

                <div className="mt-6 text-center text-gray-600">
                    New to Mom Pharmacy?{' '}
                    <Link to={redirect !== '/' ? `/signup?redirect=${redirect}` : '/signup'} className="text-pharmacy-primary font-medium hover:underline">Create an account</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
