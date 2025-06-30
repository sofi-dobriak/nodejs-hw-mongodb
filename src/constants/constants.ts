import { MongoCredentials, SortOrder } from '../types/constants';
import path from 'node:path';

export const MONGO_CREDENTIALS: MongoCredentials = {
  USER: 'MONGODB_USER',
  PASSWORD: 'MONGODB_PASSWORD',
  URL: 'MONGODB_URL',
  DB: 'MONGODB_DB',
};

export const SORT_ORDER: SortOrder = {
  ASC: 'asc',
  DESC: 'desc',
};

export const FIFTEEN_MINUTES = 1000 * 60 * 15;
export const THIRD_DAYS = 1000 * 60 * 60 * 24 * 30;

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
