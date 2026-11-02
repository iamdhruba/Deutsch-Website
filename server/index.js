import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import wordRoutes from './routes/wordRoutes.js';
import grammarRoutes from './routes/grammarRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Middleware configuration
app.use(
  cors({
    origin: [CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// API Status & Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    platform: 'Lernen',
    version: '1.0.0',
    targetLanguage: 'de',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/words', wordRoutes);
app.use('/api/grammar', grammarRoutes);

// Fallback & Error Handlers
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB and start HTTP server
const startServer = async () => {
  try {
    await connectDB();

    // Auto-seed on fresh local startup if database is empty
    try {
      const { Word } = await import('./models/Word.js');
      const wordCount = await Word.countDocuments();
      if (wordCount === 0) {
        console.log('[Lernen Server] Empty database detected. Auto-seeding sample dataset...');
        const { seedDatabase } = await import('./seed/seed.js');
        await seedDatabase(false);
      }
    } catch (seedErr) {
      console.warn(`[Lernen Server] Notice during auto-seed: ${seedErr.message}`);
      // If Atlas threw an SSL/network error, fallback to memory server
      if (mongoose.connection.host && !mongoose.connection.host.includes('127.0.0.1')) {
        console.log('[Lernen Server] Switching to local in-memory MongoDB...');
        await mongoose.disconnect();
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        const mongod = await MongoMemoryServer.create();
        await mongoose.connect(mongod.getUri());
        const { seedDatabase } = await import('./seed/seed.js');
        await seedDatabase(false);
      }
    }

    app.listen(PORT, () => {
      console.log(`[Lernen Server] Running on http://localhost:${PORT}`);
      console.log(`[Lernen Server] CORS accepting from: ${CLIENT_URL}`);
    });
  } catch (err) {
    console.error('[Lernen Server] Failed to start:', err.message);
    process.exit(1);
  }
};

startServer();

export default app;
