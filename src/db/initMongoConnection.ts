import mongoose from 'mongoose';
import { getEnvVariables } from '../utils/getEnvVariables';
import { MONGO_CREDENTIALS } from '../constants/constants';

export const initMongoDB = async (): Promise<void> => {
  try {
    const user: string = getEnvVariables(MONGO_CREDENTIALS.USER);
    const password: string = getEnvVariables(MONGO_CREDENTIALS.PASSWORD);
    const url: string = getEnvVariables(MONGO_CREDENTIALS.URL);
    const db: string = getEnvVariables(MONGO_CREDENTIALS.DB);

    await mongoose.connect(
      `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
    );

    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log('Error while setting up mongo connection', error);
    throw error;
  }
};
