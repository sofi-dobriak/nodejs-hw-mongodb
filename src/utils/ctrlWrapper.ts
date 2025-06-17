import { RequestHandler } from 'express';

export const ctrlWrapper = (controller: RequestHandler): RequestHandler => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
