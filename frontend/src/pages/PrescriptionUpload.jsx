import { useState, useContext } from 'react';
import { UploadCloud, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const PrescriptionUpload = () => {
    const [file, setFile] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login?redirect=/upload');
            return;
        }

        if (file) {
            setLoading(true);
            setError('');
            try {
                const formData = new FormData();
                formData.append('image', file);

                const config = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true };
                const { data: fileUrl } = await axios.post('/api/upload', formData, config);

                await axios.post('/api/prescriptions', { fileUrl }, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });

                setLoading(false);
                setSubmitted(true);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || 'Failed to upload prescription. Please try again.');
                setLoading(false);
            }
        }
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center py-16 text-center">
                <div className="bg-green-100 text-green-700 p-4 rounded-full mb-4">
                    <CheckCircle2 size={48} />
                </div>
                <h2 className="text-2xl font-bold mb-2">Upload Successful</h2>
                <p className="text-gray-600 mb-6">Your prescription has been submitted and is pending admin review.</p>
                <Link to="/" className="btn-primary">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="py-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Upload Prescription</h1>
            <div className="bg-white border rounded p-8 shadow-sm">
                <form onSubmit={submitHandler} className="flex flex-col">
                    <div className="w-full border-2 border-dashed border-gray-300 bg-gray-50 rounded p-8 mb-6 text-center relative cursor-pointer hover:bg-gray-100">
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept="image/*,.pdf"
                            onChange={(e) => setFile(e.target.files[0])}
                            required
                        />
                        <UploadCloud size={48} className="mx-auto text-gray-400 mb-2" />
                        <div className="font-bold text-gray-700">
                            {file ? file.name : "Select a file to upload"}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">Images or PDF</div>
                    </div>

                    {error && <div className="text-red-600 bg-red-50 p-3 rounded mb-4 border border-red-200">{error}</div>}

                    <button type="submit" className="btn-primary w-full py-3" disabled={!file || loading}>
                        {loading ? 'Uploading...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PrescriptionUpload;
