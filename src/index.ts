import { initMongoDB } from './db/initMongoConnection';
import { setupServer } from './server';

const bootstrap = async () => {
  await initMongoDB();
  setupServer();
};

bootstrap();
