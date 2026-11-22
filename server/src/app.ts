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

  // Health check (supports both /api/health and /health)
  app.get(['/api/health', '/health'], (req, res) => {
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
    if (req.path === '/api/health' || req.path === '/health' || req.path === '/') {
      return next();
    }
    try {
      await ensureConnected();
      next();
    } catch (err: any) {
      console.error('Database connection error in request:', err);
      res.status(500).json({
        success: false,
        message: 'Database connection failed: ' + err.message + '. Please ensure Atlas Network Access (0.0.0.0/0) is enabled.',
      });
    }
  });

  // Mount API modules under both /api and root prefixes for universal routing
  const mountRoutes = (prefix: string) => {
    app.use(`${prefix}/auth`, authRoutes);
    app.use(`${prefix}/schools`, schoolRoutes);
    app.use(`${prefix}/coordinators`, coordinatorRoutes);
    app.use(`${prefix}/competitions`, competitionRoutes);
    app.use(`${prefix}/registrations`, registrationRoutes);
    app.use(`${prefix}/duties`, facultyDutyRoutes);
    app.use(`${prefix}/judging`, judgingRoutes);
    app.use(`${prefix}/results`, resultRoutes);
    app.use(`${prefix}/certificates`, certificateRoutes);
    app.use(`${prefix}/notifications`, notificationRoutes);
    app.use(`${prefix}/reports`, reportRoutes);
    app.use(`${prefix}/audit-logs`, auditRoutes);
  };

  mountRoutes('/api');
  mountRoutes('');

  // Central error handling
  app.use(errorHandler);

  return app;
};

export const app = createApp();

// Standard serverless function default export for Vercel / AWS Lambda
export default function handler(req: any, res: any) {
  return app(req, res);
}

// Attach app properties for backward compatibility with framework loaders
Object.assign(handler, app);
