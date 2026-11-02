import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Connect to MongoDB database
 * Tries configured MONGODB_URI (e.g. MongoDB Atlas), and gracefully falls back
 * to local or in-memory MongoDB so development never breaks.
 */
export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  // 1. Try external URI (Atlas or custom)
  if (uri && !uri.includes('127.0.0.1') && !uri.includes('localhost')) {
    try {
      console.log('[Database] Connecting to MongoDB Atlas...');
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 4000,
      });
      console.log(`[Database] MongoDB Atlas connected: ${conn.connection.host}`);
      return conn;
    } catch (err) {
      console.warn(`[Database] Atlas connection failed: ${err.message}`);
      console.log('[Database] Falling back to in-memory MongoDB for local development...');
    }
  }

  // 2. Try local MongoDB if URI is 127.0.0.1
  if (uri && (uri.includes('127.0.0.1') || uri.includes('localhost'))) {
    try {
      const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
      console.log(`[Database] Local MongoDB connected: ${conn.connection.host}`);
      return conn;
    } catch (err) {
      console.warn(`[Database] Local MongoDB not running: ${err.message}`);
    }
  }

  // 3. Guaranteed in-memory fallback
  try {
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    const mongod = await MongoMemoryServer.create();
    const memoryUri = mongod.getUri();
    const conn = await mongoose.connect(memoryUri);
    console.log(`[Database] In-memory MongoDB connected successfully at ${memoryUri}`);
    return conn;
  } catch (fallbackErr) {
    console.error(`[Database] Fatal database initialization error: ${fallbackErr.message}`);
    throw fallbackErr;
  }
};
