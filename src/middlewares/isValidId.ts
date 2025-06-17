import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId: RequestHandler = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    throw createHttpError(400, 'Bad request', {
      details: `Invalid contactId: "${contactId}"`,
    });
  }

  next();
};
