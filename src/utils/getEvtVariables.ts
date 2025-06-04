import dotenv from 'dotenv';

dotenv.config();

export const getEnvVariables = (name: string): string => {
  const value = process.env[name];

  if (value) return value;

  throw new Error(`Missing process.evn['${name}']`);
};
