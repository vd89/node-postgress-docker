import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export default {
  availableLocals: ['en'],
  defaultLanguage: 'en',
  projectRoot: path.join(__dirname, '..'),
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || '',
  sessionSecret: process.env.SESSION_SECRET || '',
};
