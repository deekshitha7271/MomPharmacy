import HealthCondition from '../models/HealthCondition.js';

// @desc  Get all health conditions
// @route GET /api/health-conditions
// @access Public
export const getHealthConditions = async (req, res) => {
    try {
        const conditions = await HealthCondition.find({}).sort({ createdAt: 1 });
        res.json(conditions);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc  Create a health condition
// @route POST /api/health-conditions
// @access Private/Admin
export const createHealthCondition = async (req, res) => {
    try {
        const { label, icon } = req.body;
        if (!label) return res.status(400).json({ message: 'Label is required' });

        // Auto-generate a URL-safe tag from the label
        const tag = label.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        const exists = await HealthCondition.findOne({ tag });
        if (exists) return res.status(400).json({ message: 'Health condition already exists' });

        const condition = await HealthCondition.create({ label: label.trim(), tag, icon: icon || '💊' });
        res.status(201).json(condition);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc  Delete a health condition
// @route DELETE /api/health-conditions/:id
// @access Private/Admin
export const deleteHealthCondition = async (req, res) => {
    try {
        const condition = await HealthCondition.findById(req.params.id);
        if (!condition) return res.status(404).json({ message: 'Condition not found' });
        await condition.deleteOne();
        res.json({ message: 'Health condition removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc  Update a health condition
// @route PUT /api/health-conditions/:id
// @access Private/Admin
export const updateHealthCondition = async (req, res) => {
    try {
        const { label, icon } = req.body;
        const condition = await HealthCondition.findById(req.params.id);

        if (condition) {
            condition.label = label || condition.label;
            condition.icon = icon || condition.icon;

            if (label) {
                condition.tag = label.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            }

            const updatedCondition = await condition.save();
            res.json(updatedCondition);
        } else {
            res.status(404).json({ message: 'Condition not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
