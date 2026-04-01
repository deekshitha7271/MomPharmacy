import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Medicines from './pages/Medicines';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Emergency from './pages/Emergency';
import Orders from './pages/Orders';
import PrescriptionUpload from './pages/PrescriptionUpload';
import Admin from './pages/Admin';
import HealthConditions from './pages/HealthConditions';
import Success from './pages/Success';
import ScrollToTop from './components/ScrollToTop';
import Support from './pages/Support';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col premium-gradient">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/search/:keyword" element={<Medicines />} />
            <Route path="/category/:category" element={<Medicines />} />
            <Route path="/medicine/:id" element={<ProductDetails />} />
            <Route path="/cart/:id?" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/upload" element={<PrescriptionUpload />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/condition/:tag" element={<HealthConditions />} />
            <Route path="/support/:type" element={<Support />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
