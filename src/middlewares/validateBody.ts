import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { ObjectSchema, ValidationError } from 'joi';

export const validateBody =
  (schema: ObjectSchema): RequestHandler =>
  async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });

      next();
    } catch (err) {
      const error = createHttpError(400, 'Bad Request', {
        errors: (err as ValidationError).details,
      });

      next(error);
    }
  };
