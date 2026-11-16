import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ctu_competition_hub',
  USE_IN_MEMORY_DB: process.env.USE_IN_MEMORY_DB === 'true' || false,
  JWT_SECRET: process.env.JWT_SECRET || 'ctu_super_secure_jwt_secret_key_2026_dsw_competition_hub',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'ctu_super_secure_refresh_secret_key_2026_dsw_competition_hub',
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
};
