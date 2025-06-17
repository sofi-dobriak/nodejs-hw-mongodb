import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { ObjectSchema } from 'joi';

export const validateBody = (schema: ObjectSchema): RequestHandler => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
    } catch {
      const error = createHttpError(400, 'Bad request');
      next(error);
    }
  };
};
