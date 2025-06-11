import { ErrorRequestHandler } from 'express';

export const errorHandlerMiddleware: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
