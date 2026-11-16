import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { ENV } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectDB } from './config/db.js';
import { User } from './models/User.js';
import { runSeed } from './scripts/seed.js';

let isConnected = false;
export const ensureConnected = async () => {
  if (!isConnected) {
    await connectDB();
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('🌱 No users found in database. Automatically running initial CTU seed data...');
      await runSeed();
    }
    isConnected = true;
  }
};

// Route imports
import authRoutes from './routes/authRoutes.js';
import schoolRoutes from './routes/schoolRoutes.js';
import coordinatorRoutes from './routes/coordinatorRoutes.js';
import competitionRoutes from './routes/competitionRoutes.js';
import registrationRoutes from './routes/registrationRoutes.js';
import facultyDutyRoutes from './routes/facultyDutyRoutes.js';
import judgingRoutes from './routes/judgingRoutes.js';
import resultRoutes from './routes/resultRoutes.js';
import certificateRoutes from './routes/certificateRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import auditRoutes from './routes/auditRoutes.js';

export const createApp = (): express.Application => {
  const app = express();

  // Middleware
  app.use(cors({
    origin: '*',
    credentials: true,
  }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  if (ENV.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'UP',
      platform: 'CTU Competition Hub',
      university: 'CT University, Ludhiana, Punjab, India',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    });
  });

  // Database connection middleware for all API requests (skips health check)
  app.use(async (req, res, next) => {
    if (req.path === '/api/health' || req.path === '/health') {
      return next();
    }
    try {
      await ensureConnected();
      next();
    } catch (err: any) {
      console.error('Database connection error in request:', err);
      res.status(500).json({ success: false, message: 'Database connection failed: ' + err.message });
    }
  });

  // Mount API modules
  app.use('/api/auth', authRoutes);
  app.use('/api/schools', schoolRoutes);
  app.use('/api/coordinators', coordinatorRoutes);
  app.use('/api/competitions', competitionRoutes);
  app.use('/api/registrations', registrationRoutes);
  app.use('/api/duties', facultyDutyRoutes);
  app.use('/api/judging', judgingRoutes);
  app.use('/api/results', resultRoutes);
  app.use('/api/certificates', certificateRoutes);
  app.use('/api/notifications', notificationRoutes);
  app.use('/api/reports', reportRoutes);
  app.use('/api/audit-logs', auditRoutes);

  // Central error handling
  app.use(errorHandler);

  return app;
};

export const app = createApp();
export default app;
