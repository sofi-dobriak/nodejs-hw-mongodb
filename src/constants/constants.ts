import { MongoCredentials, SortOrder } from '../types/constants';

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
