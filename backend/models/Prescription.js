import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    fileUrl: { type: String, required: true },
    status: { type: String, required: true, enum: ['Pending', 'Processed', 'Rejected'], default: 'Pending' },
    generatedOrderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
}, { timestamps: true });

const Prescription = mongoose.model('Prescription', prescriptionSchema);
export default Prescription;
