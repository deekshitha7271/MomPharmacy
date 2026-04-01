import mongoose from 'mongoose';

const healthConditionSchema = new mongoose.Schema({
    label: { type: String, required: true, unique: true },
    tag: { type: String, required: true, unique: true },
    icon: { type: String, default: '💊' }
}, { timestamps: true });

const HealthCondition = mongoose.model('HealthCondition', healthConditionSchema);
export default HealthCondition;
