import app, { ensureConnected } from './app.js';
import { disconnectDB } from './config/db.js';
import { ENV } from './config/env.js';

// Run standalone server when not in Vercel serverless environment
if (!process.env.VERCEL) {
  const startServer = async () => {
    try {
      await ensureConnected();

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
}

export default app;
