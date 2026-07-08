import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/products.routes.js';
import buildRoutes from './routes/builds.routes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json({ limit: '10kb' }));

app.use('/api/auth',     authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/builds',   buildRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'PC Station API is running.' });
});

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found.` });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Something went wrong on the server.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
