import { createApp } from './app.js';
import { connectDB, disconnectDB } from './config/db.js';
import { ENV } from './config/env.js';
import { User } from './models/User.js';
import { runSeed } from './scripts/seed.js';

const startServer = async () => {
  try {
    await connectDB();

    // Auto-seed if database has no users
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('🌱 No users found in database. Automatically running initial CTU seed data...');
      await runSeed();
    }

    const app = createApp();

    const server = app.listen(ENV.PORT, () => {
      console.log(`=======================================================`);
      console.log(`🚀 CTU Competition Hub Server is LIVE on port ${ENV.PORT}`);
      console.log(`🏛️  Institution: CT University, Ludhiana, Punjab, India`);
      console.log(`🌐 Base API URL: http://localhost:${ENV.PORT}/api`);
      console.log(`🏥 Health Check: http://localhost:${ENV.PORT}/api/health`);
      console.log(`=======================================================`);
    });

    const shutdown = async () => {
      console.log('\n🛑 Gracefully shutting down CTU Competition Hub server...');
      server.close(async () => {
        await disconnectDB();
        console.log('🔌 Database disconnected. Process terminated.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error: any) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
