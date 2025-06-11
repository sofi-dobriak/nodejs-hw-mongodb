import express, { Express } from 'express';

import cors from 'cors';
import pino from 'pino-http';
import router from './routers';

import { getEnvVariables } from './utils/getEnvVariables';
import { notFountMiddleware } from './middlewares/notFoundHandler';
import { errorHandlerMiddleware } from './middlewares/errorHandler';

const PORT: number = Number(getEnvVariables('PORT')) ?? 3000;

export const setupServer = () => {
  const app: Express = express();
  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(router);

  app.use(notFountMiddleware);
  app.use(errorHandlerMiddleware);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
