import mongoose from 'mongoose';
import { getEnvVariables } from '../utils/getEnvVariables';

export const initMongoDB = async (): Promise<void> => {
  try {
    const user: string = getEnvVariables('MONGODB_USER');
    const password: string = getEnvVariables('MONGODB_PASSWORD');
    const url: string = getEnvVariables('MONGODB_URL');
    const db: string = getEnvVariables('MONGODB_DB');

    if (!user || !password || !url || !db) {
      throw new Error(
        'Missing one or more environment variables for MongoDB connection',
      );
    }

    await mongoose.connect(
      `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
    );

    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log('Error while setting up mongo connection', error);
    throw error;
  }
};
