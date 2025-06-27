import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { sessionCollection } from '../db/models/session';
import { userCollection } from '../db/models/user';

export const authenticate: RequestHandler = async (req, res, next) => {
  const header = req.get('Authorization');

  if (!header) {
    throw createHttpError(401, 'Authorization token is missing');
  }

  const [bearer, token] = header.split(' ');

  if (bearer !== 'Bearer' && !token) {
    throw createHttpError(401, 'Auth token must be of the Bearer type');
  }

  const session = await sessionCollection.findOne({ accessToken: token });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (session.accessTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Access token expired');
  }

  const user = await userCollection.findById(session.userId);

  if (!user) {
    throw createHttpError(401, 'User not found');
  }

  req.user = user;

  next();
};
