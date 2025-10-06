
import dotenv from 'dotenv';

dotenv.config(); 

export const JWT_SECRET = process.env.JWT_SECRET || '';
export const DATABASE_URL = process.env.DATABASE_URL || '';
export const PORT = process.env.PORT || 3000;
