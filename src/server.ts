import express, { NextFunction, Response, Request, Express } from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEvnVariables } from './utils/getEvtVariables';

const PORT: number = Number(getEvnVariables('PORT', '3000'));

export const setupServer = () => {
  const app: Express = express();
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req: Request, res: Response, next: NextFunction): void => {
    res.status(200).json({
      message: 'Hello from new server',
    });
  });

  app.use((req: Request, res: Response, next: NextFunction): void => {
    res.status(404).json({
      message: 'Not found on new server',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
