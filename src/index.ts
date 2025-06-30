import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/constants';
import { initMongoDB } from './db/initMongoConnection';
import { setupServer } from './server';
import { createDirIfNotExist } from './types/createDirIfNotExist';

await initMongoDB();

await createDirIfNotExist(TEMP_UPLOAD_DIR);
await createDirIfNotExist(UPLOAD_DIR);

setupServer();
