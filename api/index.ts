import { createApp } from '../server/src/app.js';
import { connectDB } from '../server/src/config/db.js';

let isConnected = false;
const app = createApp();

export default async function handler(req: any, res: any) {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (err: any) {
      console.error('Failed to connect to MongoDB in serverless handler:', err);
      return res.status(500).json({ success: false, message: 'Database connection failed' });
    }
  }
  return app(req, res);
}
