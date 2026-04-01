import Medicine from '../models/Medicine.js';

export const getMedicines = async (req, res) => {
    try {
        const keyword = req.query.keyword
            ? { name: { $regex: req.query.keyword, $options: 'i' } }
            : {};

        const featuredFilter = req.query.featured === 'true' ? { isFeatured: true } : {};
        const tagFilter = req.query.tag ? { tags: req.query.tag } : {};
        const categoryFilter = req.query.category
            ? { category: { $regex: req.query.category, $options: 'i' } }
            : {};

        const medicines = await Medicine.find({ ...keyword, ...featuredFilter, ...tagFilter, ...categoryFilter });
        res.json(medicines);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getMedicineById = async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (medicine) {
            res.json(medicine);
        } else {
            res.status(404).json({ message: 'Medicine not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const createMedicine = async (req, res) => {
    try {
        const { name, price, description, category, imageUrl, isEssential, isFeatured, stock, precautions, usage, tags } = req.body;
        const medicine = new Medicine({
            name, price, description, category, imageUrl, isEssential, isFeatured, stock, precautions, usage,
            tags: tags || []
        });
        const createdMedicine = await medicine.save();
        res.status(201).json(createdMedicine);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update a medicine
// @route   PUT /api/medicines/:id
// @access  Private/Admin
export const updateMedicine = async (req, res) => {
    try {
        const { name, price, description, category, imageUrl, isEssential, isFeatured, stock, precautions, usage, tags } = req.body;
        const medicine = await Medicine.findById(req.params.id);

        if (medicine) {
            medicine.name = name || medicine.name;
            medicine.price = price !== undefined ? Number(price) : medicine.price;
            medicine.description = description || medicine.description;
            medicine.category = category || medicine.category;
            medicine.imageUrl = imageUrl || medicine.imageUrl;
            medicine.isEssential = isEssential !== undefined ? isEssential : medicine.isEssential;
            medicine.isFeatured = isFeatured !== undefined ? isFeatured : medicine.isFeatured;
            medicine.stock = stock !== undefined ? Number(stock) : medicine.stock;
            medicine.precautions = precautions || medicine.precautions;
            medicine.usage = usage || medicine.usage;
            medicine.tags = tags || medicine.tags;

            const updatedMedicine = await medicine.save();
            res.json(updatedMedicine);
        } else {
            res.status(404).json({ message: 'Medicine not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
