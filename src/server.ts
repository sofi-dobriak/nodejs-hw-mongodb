import express, { NextFunction, Response, Request, Express } from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getAllContacts, getContactByID } from './services/contacts';

const PORT: number = Number(process.env.PORT) || 3000;

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

  app.get('/contacts', async (req: Request, res: Response): Promise<void> => {
    const contacts = await getAllContacts();

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get(
    '/contacts/:contactId',
    async (req: Request, res: Response): Promise<void> => {
      const { contactId } = req.params;
      const contact = await getContactByID(contactId);

      if (!contact) {
        res.status(404).json({
          message: 'Contact not found',
        });

        return;
      }

      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    },
  );

  app.use((req: Request, res: Response, next: NextFunction): void => {
    res.status(404).json({
      message: 'Not found page',
    });
  });

  app.use(
    (err: Error, req: Request, res: Response, next: NextFunction): void => {
      res.status(500).json({
        message: 'Something went wrong',
        error: err.message,
      });
    },
  );

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
