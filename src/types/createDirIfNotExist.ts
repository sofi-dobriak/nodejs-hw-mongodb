import fs from 'node:fs/promises';

export const createDirIfNotExist = async (url: string) => {
  try {
    await fs.access(url);
  } catch (err) {
    if (err instanceof Error && 'code' in err && err.code === 'ENOENT') {
      await fs.mkdir(url);
    }
  }
};
