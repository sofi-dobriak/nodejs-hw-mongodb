import path from 'node:path';
import fs from 'node:fs/promises';
import { Photo } from '../types/photo';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/constants';
import { getEnvVariables } from './getEnvVariables';

export const saveFileToUploadDir = async (file: Photo) => {
  await fs.rename(
    path.join(TEMP_UPLOAD_DIR, file.filename),
    path.join(UPLOAD_DIR, file.filename),
  );

  return `${getEnvVariables('APP_DOMAIN')}/uploads/${file.filename}`;
};
