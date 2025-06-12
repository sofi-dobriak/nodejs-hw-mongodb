import { RequestHandler } from 'express';

export const getHomePageController: RequestHandler = (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Hello, mentor! Welcome to the homepage :)',
  });
};
