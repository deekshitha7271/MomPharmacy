import { useState, useEffect } from 'react';
import axios from 'axios';
import MedicineCard from '../components/MedicineCard';

const Emergency = () => {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const { data } = await axios.get(`/api/medicines`);
                setMedicines(data.filter(med => med.isEssential));
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchMedicines();
    }, []);

    return (
        <div className="py-8">
            <div className="bg-rose-50 border border-rose-100 p-8 rounded-3xl mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-extrabold text-rose-600 mb-2 flex items-center gap-2">⚡ Emergency Care</h2>
                    <p className="text-rose-700/80 font-medium text-lg">Fast access to essential medicines. Ships immediately.</p>
                </div>
            </div>

            {loading ? (
                <div className="text-center text-rose-500 font-medium py-10 text-xl">Preparing essential care...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {medicines.map(med => (
                        <MedicineCard key={med._id} medicine={med} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Emergency;
