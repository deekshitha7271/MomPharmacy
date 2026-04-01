import { useState, useEffect } from 'react';
import axios from 'axios';
import MedicineCard from '../components/MedicineCard';
import Loader from '../components/Loader';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Medicines = () => {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const { keyword, category } = useParams();

    useEffect(() => {
        const fetchMedicines = async () => {
            setLoading(true);
            try {
                let url = '/api/medicines';
                if (keyword) url += `?keyword=${keyword}`;
                else if (category) url += `?category=${encodeURIComponent(category)}`;
                const { data } = await axios.get(url);
                setMedicines(data);
            } catch (error) {
                console.error("Error fetching medicines", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMedicines();
    }, [keyword, category]);

    const pageTitle = keyword
        ? `Search results for "${keyword}"`
        : category
            ? category
            : 'All Medicines';

    return (
        <div className="py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium">
                <Link to="/" className="hover:text-pharmacy-primary">Home</Link>
                <ChevronRight size={14} />
                {category && (
                    <>
                        <span>Categories</span>
                        <ChevronRight size={14} />
                    </>
                )}
                <span className="text-pharmacy-dark capitalize">{pageTitle}</span>
            </div>

            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-pharmacy-dark capitalize">{pageTitle}</h2>
                {!loading && <span className="text-sm text-gray-500">{medicines.length} product{medicines.length !== 1 ? 's' : ''}</span>}
            </div>

            {loading ? (
                <Loader />
            ) : medicines.length === 0 ? (
                <div className="text-center text-gray-500 py-20 border border-dashed rounded-xl">
                    <p className="text-2xl font-bold mb-2">No medicines found.</p>
                    <p className="text-gray-400 text-sm mt-2 mb-6">
                        {category ? `No products are listed under "${category}" yet.` : 'Nothing here yet.'}
                    </p>
                    <Link to="/" className="btn-primary px-6 py-2.5 inline-block text-sm">Back to Home</Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {medicines.map(med => (
                        <MedicineCard key={med._id} medicine={med} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Medicines;
