import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';
import { getEnvVariables } from './getEnvVariables';
import { CLOUDINARY } from '../constants/constants';
import { FileInterface } from '../types/file';

cloudinary.v2.config({
  secure: true,
  cloud_name: getEnvVariables(CLOUDINARY.CLOUD_NAME),
  api_key: getEnvVariables(CLOUDINARY.API_KEY),
  api_secret: getEnvVariables(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file: FileInterface) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
