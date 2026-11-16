import mongoose from 'mongoose';
import { ENV } from './env.js';

let mongodInstance: any = null;

export const connectDB = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    if (ENV.USE_IN_MEMORY_DB) {
      console.log('⚡ Initializing in-memory MongoDB server as requested...');
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      mongodInstance = await MongoMemoryServer.create();
      const uri = mongodInstance.getUri();
      await mongoose.connect(uri);
      console.log(`✅ Connected to In-Memory MongoDB at: ${uri}`);
      return;
    }

    console.log(`⏳ Attempting connection to MongoDB at: ${ENV.MONGODB_URI.replace(/:([^@]+)@/, ':****@')}`);
    // Try connecting to configured MongoDB
    try {
      await mongoose.connect(ENV.MONGODB_URI, {
        serverSelectionTimeoutMS: 8000,
      });
      console.log(`✅ Connected to MongoDB at: ${ENV.MONGODB_URI.replace(/:([^@]+)@/, ':****@')}`);
      return;
    } catch (primaryErr: any) {
      console.warn(`⚠️ Could not connect to primary MongoDB (${primaryErr.message}).`);
      
      // On Vercel, do not attempt embedded memory server (fails in serverless)
      if (process.env.VERCEL) {
        throw new Error(`MongoDB connection error: ${primaryErr.message}. Verify MONGODB_URI and Atlas Network Access (0.0.0.0/0).`);
      }

      console.log('⚡ Falling back to embedded MongoMemoryServer for standalone zero-config runtime...');
      
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      mongodInstance = await MongoMemoryServer.create();
      const uri = mongodInstance.getUri();
      await mongoose.connect(uri);
      console.log(`✅ Connected to Embedded MongoMemoryServer at: ${uri}`);
    }
  } catch (error: any) {
    console.error('❌ MongoDB connection error:', error.message);
    if (!process.env.VERCEL) {
      process.exit(1);
    }
    throw error;
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    if (mongodInstance) {
      await mongodInstance.stop();
    }
  } catch (err: any) {
    console.error('Error disconnecting MongoDB:', err);
  }
};
