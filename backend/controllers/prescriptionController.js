import Prescription from '../models/Prescription.js';

// @desc Create new prescription upload record
// @route POST /api/prescriptions
// @access Private
export const addPrescription = async (req, res) => {
    try {
        const { fileUrl } = req.body;
        if (!fileUrl) return res.status(400).json({ message: 'No file URL provided' });

        const prescription = await Prescription.create({
            user: req.user._id,
            fileUrl,
            status: 'Pending'
        });
        res.status(201).json(prescription);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc Get all prescriptions (admin)
// @route GET /api/prescriptions
// @access Private/Admin
export const getPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find({}).populate('user', 'name email').sort({ createdAt: -1 });
        res.json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc Get user's active prescriptions
// @route GET /api/prescriptions/my
// @access Private
export const getMyPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc Update prescription Status
// @route PUT /api/prescriptions/:id/status
// @access Private/Admin
export const updatePrescriptionStatus = async (req, res) => {
    try {
        const { status, generatedOrderId } = req.body;
        const prescription = await Prescription.findById(req.params.id);

        if (prescription) {
            prescription.status = status;
            if (generatedOrderId) prescription.generatedOrderId = generatedOrderId;
            const updatedPrescription = await prescription.save();
            res.json(updatedPrescription);
        } else {
            res.status(404).json({ message: 'Prescription not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
