import mongoose from 'mongoose';
import { getEvnVariables } from '../utils/getEvtVariables';

export const initMongoDB = async (): Promise<void> => {
  try {
    const user: string = getEvnVariables('MONGODB_USER');
    const password: string = getEvnVariables('MONGODB_PASSWORD');
    const url: string = getEvnVariables('MONGODB_URL');
    const db: string = getEvnVariables('MONGODB_DB');

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
