import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

export const NODE_ENV = process.env.NODE_ENV || 'development';

export const DATABASE_URL = process.env.DATABASE_URL || '';
