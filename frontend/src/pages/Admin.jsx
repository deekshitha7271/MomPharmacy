import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { HEALTH_ICONS, ICON_LABELS, ICON_KEYS, getHealthIcon } from '../data/healthIcons.jsx';

const Admin = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [medicines, setMedicines] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [catName, setCatName] = useState('');
    const [catImageUrl, setCatImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [stock, setStock] = useState('');
    const [isEssential, setIsEssential] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);

    // Edit states
    const [editMedicineId, setEditMedicineId] = useState(null);
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editConditionId, setEditConditionId] = useState(null);

    // Health conditions
    const [healthConditions, setHealthConditions] = useState([]);
    const [condLabel, setCondLabel] = useState('');
    const [condIcon, setCondIcon] = useState('diabetes');

    const [activeTab, setActiveTab] = useState('inventory');
    const [prescriptions, setPrescriptions] = useState([]);
    const [activePrescription, setActivePrescription] = useState(null);
    const [cart, setCart] = useState([]);
    const [cartLoading, setCartLoading] = useState(false);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
            return;
        }
        fetchMedicines();
        fetchCategories();
        fetchPrescriptions();
        fetchHealthConditions();
    }, [user, navigate]);

    const fetchPrescriptions = async () => {
        try {
            const { data } = await axios.get('/api/prescriptions', { withCredentials: true });
            setPrescriptions(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get('/api/categories');
            setCategories(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchHealthConditions = async () => {
        try {
            const { data } = await axios.get('/api/health-conditions');
            setHealthConditions(data);
        } catch (error) {
            console.error(error);
        }
    };

    const createHealthConditionHandler = async (e) => {
        e.preventDefault();
        try {
            if (editConditionId) {
                await axios.put(`/api/health-conditions/${editConditionId}`, { label: condLabel, icon: condIcon }, { withCredentials: true });
            } else {
                await axios.post('/api/health-conditions', { label: condLabel, icon: condIcon }, { withCredentials: true });
            }
            setCondLabel(''); setCondIcon('💊'); setEditConditionId(null);
            fetchHealthConditions();
        } catch (error) {
            alert(error.response?.data?.message || 'Error saving condition');
        }
    };

    const handleEditHealthCondition = (cond) => {
        setEditConditionId(cond._id);
        setCondLabel(cond.label);
        setCondIcon(cond.icon);
    };

    const deleteHealthConditionHandler = async (id) => {
        if (window.confirm('Delete this health condition?')) {
            try {
                await axios.delete(`/api/health-conditions/${id}`, { withCredentials: true });
                fetchHealthConditions();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const fetchMedicines = async () => {
        try {
            const { data } = await axios.get('/api/medicines');
            setMedicines(data);
        } catch (error) {
            console.error(error);
        }
    };

    const createMedicineHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = { name, price: Number(price), category, description, imageUrl, stock: Number(stock), isEssential, isFeatured, tags };
            if (editMedicineId) {
                await axios.put(`/api/medicines/${editMedicineId}`, payload, { headers: { 'Content-Type': 'application/json' } });
            } else {
                await axios.post('/api/medicines', payload, { headers: { 'Content-Type': 'application/json' } });
            }
            setLoading(false);
            setName(''); setPrice(''); setCategory(''); setDescription(''); setImageUrl(''); setStock(''); setIsEssential(false); setIsFeatured(false); setTags([]); setEditMedicineId(null);
            fetchMedicines();
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleEditMedicine = (med) => {
        setEditMedicineId(med._id);
        setName(med.name);
        setPrice(String(med.price));
        setCategory(med.category);
        setDescription(med.description);
        setImageUrl(med.imageUrl);
        setStock(String(med.stock));
        setIsEssential(med.isEssential);
        setIsFeatured(med.isFeatured);
        setTags(med.tags || []);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const createCategoryHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = { name: catName, imageUrl: catImageUrl };
            if (editCategoryId) {
                await axios.put(`/api/categories/${editCategoryId}`, payload, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
            } else {
                await axios.post('/api/categories', payload, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
            }
            setLoading(false);
            setCatName(''); setCatImageUrl(''); setEditCategoryId(null);
            fetchCategories();
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleEditCategory = (cat) => {
        setEditCategoryId(cat._id);
        setCatName(cat.name);
        setCatImageUrl(cat.imageUrl);
    };

    const deleteCategoryHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await axios.delete(`/api/categories/${id}`, { withCredentials: true });
                fetchCategories();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const addToCart = (med) => {
        const exist = cart.find(x => x.medicine === med._id);
        if (exist) {
            setCart(cart.map(x => x.medicine === med._id ? { ...exist, qty: exist.qty + 1 } : x));
        } else {
            setCart([...cart, { medicine: med._id, name: med.name, image: med.imageUrl, price: med.price, qty: 1 }]);
        }
    };

    const removeFromCart = (id) => setCart(cart.filter(x => x.medicine !== id));

    const submitAssistedOrder = async () => {
        if (cart.length === 0) return alert('Cart is empty.');
        setCartLoading(true);
        try {
            // Populate user's DB cart instead of creating order directly
            await axios.post('/api/cart/admin-add', {
                userId: activePrescription.user._id,
                items: cart.map(item => ({ medicine: item.medicine, qty: item.qty }))
            }, { withCredentials: true });

            await axios.put(`/api/prescriptions/${activePrescription._id}/status`, {
                status: 'Processed'
            }, { withCredentials: true });

            setCartLoading(false);
            setActivePrescription(null);
            setCart([]);
            fetchPrescriptions();
            alert('Prescription processed and items added to user\'s cart!');
        } catch (error) {
            console.error(error);
            setCartLoading(false);
            alert('Failed to process prescription.');
        }
    };

    return (
        <div className="py-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <div className="flex gap-2">
                    <button onClick={() => setActiveTab('inventory')} className={`px-4 py-2 rounded-lg border font-semibold transition-all ${activeTab === 'inventory' ? 'bg-[#10847e] text-white border-[#10847e] shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>Inventory Options</button>
                    <button onClick={() => setActiveTab('prescriptions')} className={`px-4 py-2 rounded-lg border font-semibold transition-all ${activeTab === 'prescriptions' ? 'bg-[#10847e] text-white border-[#10847e] shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>Process Prescriptions</button>
                </div>
            </div>

            {activeTab === 'inventory' ? (
                <div className="flex flex-col md:flex-row gap-8">

                    <div className="md:w-1/3 flex flex-col gap-8">
                        <div className="premium-card p-6">
                            <h2 className="text-xl font-bold mb-4">{editMedicineId ? 'Edit Product' : 'Add Product'}</h2>
                            <form onSubmit={createMedicineHandler} className="flex flex-col gap-4">
                                <input type="text" placeholder="Name" required className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-pharmacy-primary/50 transition" value={name} onChange={(e) => setName(e.target.value)} />
                                <input type="number" placeholder="Price (₹)" required className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-pharmacy-primary/50 transition" value={price} onChange={(e) => setPrice(e.target.value)} />
                                <select required className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-pharmacy-primary/50 transition bg-white" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="" disabled>Select Category</option>
                                    {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                                </select>
                                <textarea placeholder="Description" required rows="3" className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-pharmacy-primary/50 transition" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                <input type="text" placeholder="Image URL (e.g., https://via.placeholder.com/150)" required className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-pharmacy-primary/50 transition" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                                <input type="number" placeholder="Stock" required className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-pharmacy-primary/50 transition" value={stock} onChange={(e) => setStock(e.target.value)} />

                                <label className="flex items-center gap-2 mt-2">
                                    <input type="checkbox" checked={isEssential} onChange={(e) => setIsEssential(e.target.checked)} className="rounded w-4 h-4 text-pharmacy-primary" />
                                    <span className="text-sm font-medium text-gray-700">Is Essential Medicine (Emergency)</span>
                                </label>

                                <label className="flex items-center gap-2">
                                    <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="rounded w-4 h-4" />
                                    <span className="text-sm font-medium text-gray-700">Show on Home Page (Featured)</span>
                                </label>

                                <div className="mt-2 text-left">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Health Condition Tags</label>
                                    <div className="flex flex-wrap gap-2">
                                        {healthConditions.length === 0 && (
                                            <span className="text-sm text-gray-500 italic p-2 border border-dashed border-gray-200 rounded-lg w-full">Add health conditions first</span>
                                        )}
                                        {healthConditions.map(c => {
                                            const isSelected = tags.includes(c.tag);
                                            return (
                                                <button
                                                    key={c._id}
                                                    type="button"
                                                    onClick={() => {
                                                        if (isSelected) {
                                                            setTags(tags.filter(t => t !== c.tag));
                                                        } else {
                                                            setTags([...tags, c.tag]);
                                                        }
                                                    }}
                                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${isSelected
                                                        ? 'bg-pharmacy-primary text-white border-pharmacy-primary shadow-sm'
                                                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {c.label} {isSelected && '✕'}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <button type="submit" disabled={loading} className="btn-primary mt-4 py-3 text-lg w-full">
                                    {loading ? 'Saving...' : editMedicineId ? 'Update Medicine' : 'Add Medicine'}
                                </button>
                                {editMedicineId && (
                                    <button type="button" onClick={() => { setEditMedicineId(null); setName(''); setPrice(''); setCategory(''); setDescription(''); setImageUrl(''); setStock(''); setIsEssential(false); setIsFeatured(false); setTags([]); }} className="text-gray-500 text-sm font-medium hover:underline text-center w-full mt-2">
                                        Cancel Edit
                                    </button>
                                )}
                            </form>
                        </div>

                        <div className="premium-card p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">{editCategoryId ? 'Edit Category' : 'Manage Categories'}</h2>
                                {editCategoryId && <button type="button" onClick={() => { setEditCategoryId(null); setCatName(''); setCatImageUrl(''); }} className="text-xs text-gray-500 hover:underline">Cancel</button>}
                            </div>
                            <form onSubmit={createCategoryHandler} className="flex flex-col gap-4 mb-6">
                                <input type="text" placeholder="Category Name" required className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-pharmacy-primary/50 transition" value={catName} onChange={(e) => setCatName(e.target.value)} />
                                <input type="text" placeholder="Image URL (Clear background)" required className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-pharmacy-primary/50 transition" value={catImageUrl} onChange={(e) => setCatImageUrl(e.target.value)} />
                                <button type="submit" disabled={loading} className="btn-primary py-2 text-md w-full">
                                    {loading ? 'Saving...' : editCategoryId ? 'Update Category' : 'Add Category'}
                                </button>
                            </form>

                            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                                {categories.map(c => (
                                    <div key={c._id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            <img src={c.imageUrl} alt={c.name} className="w-10 h-10 object-contain mix-blend-multiply" />
                                            <span className="font-semibold text-sm">{c.name}</span>
                                        </div>
                                        <div>
                                            <button onClick={() => handleEditCategory(c)} className="text-[#10847e] hover:text-[#0d6e69] text-sm font-bold p-2 mr-1">✏️</button>
                                            <button onClick={() => deleteCategoryHandler(c._id)} className="text-rose-500 hover:text-rose-700 text-sm font-bold p-2">✕</button>
                                        </div>
                                    </div>
                                ))}
                                {categories.length === 0 && <p className="text-sm text-gray-400">No categories added yet.</p>}
                            </div>
                        </div>

                        <div className="premium-card p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">{editConditionId ? 'Edit Condition' : 'Manage Health Conditions'}</h2>
                                {editConditionId && <button type="button" onClick={() => { setEditConditionId(null); setCondLabel(''); setCondIcon('💊'); }} className="text-xs text-gray-500 hover:underline">Cancel</button>}
                            </div>
                            <form onSubmit={createHealthConditionHandler} className="flex flex-col gap-3 mb-5">
                                <input
                                    type="text"
                                    placeholder="Condition Name (e.g. Diabetes Care)"
                                    required
                                    className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-pharmacy-primary/50 transition"
                                    value={condLabel}
                                    onChange={(e) => setCondLabel(e.target.value)}
                                />
                                <div>
                                    <p className="text-xs font-medium text-gray-600 mb-2">Pick an icon:</p>
                                    <div className="grid grid-cols-5 gap-1.5">
                                        {ICON_KEYS.map(key => (
                                            <button
                                                key={key}
                                                type="button"
                                                title={ICON_LABELS[key]}
                                                onClick={() => setCondIcon(key)}
                                                className={`w-full aspect-square p-2 rounded-lg border-2 flex items-center justify-center transition-all ${condIcon === key
                                                    ? 'border-orange-400 bg-orange-50'
                                                    : 'border-gray-200 bg-white hover:border-orange-200 hover:bg-orange-50/50'
                                                    }`}
                                            >
                                                <div className="w-7 h-7">{HEALTH_ICONS[key]}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <button type="submit" className="btn-primary py-2 text-md w-full">{editConditionId ? 'Update Condition' : 'Add Condition'}</button>
                            </form>
                            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                {healthConditions.map(c => (
                                    <div key={c._id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 flex-shrink-0">{getHealthIcon(c.icon)}</div>
                                            <div>
                                                <span className="font-semibold text-sm">{c.label}</span>
                                                <span className="block text-xs text-gray-400 font-mono">{c.tag}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <button onClick={() => handleEditHealthCondition(c)} className="text-[#10847e] hover:text-[#0d6e69] text-sm font-bold p-2 mr-1">✏️</button>
                                            <button onClick={() => deleteHealthConditionHandler(c._id)} className="text-rose-500 hover:text-rose-700 text-sm font-bold p-2">✕</button>
                                        </div>
                                    </div>
                                ))}
                                {healthConditions.length === 0 && <p className="text-sm text-gray-400">No health conditions added yet.</p>}
                            </div>
                        </div>
                    </div>

                    <div className="md:w-2/3">
                        <div className="premium-card p-6 overflow-x-auto">
                            <h2 className="text-xl font-bold mb-4">Current Inventory</h2>
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-200 text-gray-500 bg-gray-50/50">
                                        <th className="py-3 px-4 font-medium rounded-tl-lg">ID</th>
                                        <th className="py-3 px-4 font-medium">Name</th>
                                        <th className="py-3 px-4 font-medium">Price</th>
                                        <th className="py-3 px-4 font-medium">Category</th>
                                        <th className="py-3 px-4 font-medium">Stock</th>
                                        <th className="py-3 px-4 font-medium rounded-tr-lg text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {medicines.map(med => (
                                        <tr key={med._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                            <td className="py-3 px-4 font-mono text-xs text-gray-500">{med._id}</td>
                                            <td className="py-3 px-4 font-bold text-pharmacy-dark">{med.name}</td>
                                            <td className="py-3 px-4 font-medium text-emerald-600">₹{med.price?.toFixed(2)}</td>
                                            <td className="py-3 px-4 text-sm">{med.category}</td>
                                            <td className="py-3 px-4 font-bold">{med.stock}</td>
                                            <td className="py-3 px-4 text-right">
                                                <button onClick={() => handleEditMedicine(med)} className="text-[#10847e] hover:text-[#0d6e69] text-sm font-bold underline px-2 py-1">Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {medicines.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="text-center py-8 text-gray-500">No inventory found. Add some medicines!</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-8">
                    {!activePrescription ? (
                        <div className="premium-card p-6">
                            <h2 className="text-xl font-bold mb-4">Uploaded Prescriptions</h2>
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-200 text-gray-500 bg-gray-50/50">
                                        <th className="py-3 px-4 rounded-tl-lg">User</th>
                                        <th className="py-3 px-4">File</th>
                                        <th className="py-3 px-4">Status</th>
                                        <th className="py-3 px-4 rounded-tr-lg">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prescriptions.map(p => (
                                        <tr key={p._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                            <td className="py-3 px-4 font-bold">{p.user?.name} <span className="text-xs text-gray-400 block">{p.user?.email}</span></td>
                                            <td className="py-3 px-4"><a href={p.fileUrl} target="_blank" rel="noreferrer" className="text-pharmacy-primary hover:text-teal-700 underline text-sm transition font-medium">View Image/PDF</a></td>
                                            <td className="py-3 px-4"><span className={`px-3 py-1 text-xs font-bold rounded-full ${p.status === 'Pending' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'}`}>{p.status}</span></td>
                                            <td className="py-3 px-4">
                                                {p.status === 'Pending' && <button onClick={() => setActivePrescription(p)} className="btn-primary py-1.5 px-4 text-xs">Build Order</button>}
                                                {p.status === 'Processed' && <span className="text-gray-400 text-xs font-semibold">Order Dispatched</span>}
                                            </td>
                                        </tr>
                                    ))}
                                    {prescriptions.length === 0 && (
                                        <tr><td colSpan="4" className="text-center py-8 text-gray-500 text-sm">No prescriptions have been uploaded by users.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-6">
                            <div className="lg:w-1/2 border rounded p-4 bg-white">
                                <div className="flex justify-between items-center mb-4 border-b pb-2">
                                    <h2 className="text-xl font-bold">Review Prescription</h2>
                                    <button onClick={() => { setActivePrescription(null); setCart([]); }} className="text-red-500 hover:underline">Close</button>
                                </div>
                                <div className="mb-2"><strong>Patient:</strong> {activePrescription.user?.name}</div>
                                <div className="w-full h-[600px] bg-gray-100 border rounded overflow-auto">
                                    {activePrescription.fileUrl.endsWith('.pdf') ? (
                                        <embed src={activePrescription.fileUrl} type="application/pdf" className="w-full h-full" />
                                    ) : (
                                        <img src={activePrescription.fileUrl} alt="Prescription" className="w-full object-contain" />
                                    )}
                                </div>
                            </div>

                            <div className="lg:w-1/2 flex flex-col gap-6">
                                <div className="border rounded p-4 bg-white">
                                    <h2 className="text-lg font-bold mb-3 border-b pb-2">Inventory Search ({medicines.length})</h2>
                                    <div className="h-48 overflow-y-auto space-y-2">
                                        {medicines.map(med => (
                                            <div key={med._id} className="flex justify-between items-center border p-2 rounded">
                                                <div className="flex items-center gap-3">
                                                    <img src={med.imageUrl} className="w-8 h-8 object-contain" alt="" />
                                                    <div>
                                                        <div className="font-bold">{med.name}</div>
                                                        <div className="text-sm text-gray-600">₹{med.price.toFixed(2)} | Stock: {med.stock}</div>
                                                    </div>
                                                </div>
                                                <button onClick={() => addToCart(med)} className="bg-teal-50 text-teal-700 px-3 py-1 rounded hover:bg-teal-100 border border-teal-200 transition-colors">+</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border rounded p-4 bg-white flex-grow flex flex-col">
                                    <h2 className="text-lg font-bold mb-3 border-b pb-2">Order Cart ({cart.length})</h2>
                                    <div className="flex-grow overflow-y-auto space-y-2 mb-4 max-h-48">
                                        {cart.map(item => (
                                            <div key={item.medicine} className="flex justify-between items-center bg-gray-50 border p-2 rounded">
                                                <div className="flex items-center gap-2">
                                                    <span>{item.name}</span>
                                                    <span className="text-gray-500">x{item.qty}</span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="font-bold">₹{(item.price * item.qty).toFixed(2)}</span>
                                                    <button onClick={() => removeFromCart(item.medicine)} className="text-red-500 hover:underline">Remove</button>
                                                </div>
                                            </div>
                                        ))}
                                        {cart.length === 0 && <div className="text-gray-500 py-4 text-center">Cart is empty.</div>}
                                    </div>
                                    <div className="border-t pt-4">
                                        <div className="flex justify-between text-gray-600 mb-1">
                                            <span>Subtotal:</span>
                                            <span>₹{cart.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600 mb-2 border-b pb-2">
                                            <span>Tax (15%):</span>
                                            <span>₹{(cart.reduce((a, c) => a + c.price * c.qty, 0) * 0.15).toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <span className="font-bold text-xl">Total: ₹{(cart.reduce((a, c) => a + c.price * c.qty, 0) * 1.15).toFixed(2)}</span>
                                            <button onClick={submitAssistedOrder} disabled={cartLoading || cart.length === 0} className="bg-[#10847e] text-white px-5 py-2.5 rounded-lg hover:bg-[#0d6e69] disabled:bg-gray-300 font-bold shadow-md transition-all">
                                                {cartLoading ? 'Processing...' : 'Submit Order'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Admin;
