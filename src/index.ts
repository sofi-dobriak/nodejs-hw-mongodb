import { initMongoDB } from './db/initMongoConnection';
import { setupServer } from './server';

await initMongoDB();
setupServer();
