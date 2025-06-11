import { RequestHandler } from 'express';

export const notFountMiddleware: RequestHandler = (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Route not found',
  });
};
