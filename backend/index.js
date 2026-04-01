import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.get('/', (req, res) => {
    res.send('Mom Pharmacy API is running');
});

import authRoutes from './routes/authRoutes.js';
import medicineRoutes from './routes/medicineRoutes.js';
import path from 'path';
import orderRoutes from './routes/orderRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import prescriptionRoutes from './routes/prescriptionRoutes.js';
import healthConditionRoutes from './routes/healthConditionRoutes.js';
import stripeRoutes from './routes/stripeRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/health-conditions', healthConditionRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/cart', cartRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('Mom Pharmacy API is running');
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
