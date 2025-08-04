import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import authRoutes from './routes/authRoutes.js'
import roomRoutes from './routes/roomRoutes.js'
import checkinRoutes from './routes/checkinRoutes.js'
import userRoutes from './routes/userRoutes.js'
import storeRoutes from './routes/storeRoutes.js'

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send("Hello from Momentum API 🚀");
});

app.use('/api/auth', authRoutes);
app.use('/api/room', roomRoutes);
app.use('/api/checkin', checkinRoutes);
app.use('/api/user', userRoutes);
app.use('/api/store', storeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});