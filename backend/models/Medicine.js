import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    usage: { type: String },
    precautions: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    isEssential: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    stock: { type: Number, default: 0 },
    tags: { type: [String], default: [] }
}, { timestamps: true });

const Medicine = mongoose.model('Medicine', medicineSchema);
export default Medicine;
