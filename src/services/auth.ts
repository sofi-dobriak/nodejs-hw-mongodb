import createHttpError from 'http-errors';
import { userCollection } from '../db/models/user';
import { User } from '../types/users';
import bcrypt from 'bcrypt';
import { sessionCollection } from '../db/models/session';
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, THIRD_DAYS } from '../constants/constants';
import { RefreshSession } from '../types/session';

export const registerUser = async (payload: User) => {
  const user = await userCollection.findOne({ email: payload.email });

  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await userCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload: User) => {
  const user = await userCollection.findOne({ email: payload.email });

  if (!user) {
    throw createHttpError(401, 'User not found');
  }

  const isEqualPassword = await bcrypt.compare(payload.password, user.password);

  if (!isEqualPassword) {
    throw createHttpError(401, 'Unauthorized');
  }

  await sessionCollection.deleteOne({ userId: user._id });

  return await sessionCollection.create({
    userId: user._id,
    ...createUserSession(),
  });
};

export const logoutUser = async (sessionId: string, refreshToken: string) => {
  await sessionCollection.deleteOne({
    _id: sessionId,
    refreshToken,
  });
};

export const refreshUserSession = async ({
  sessionId,
  refreshToken,
}: RefreshSession) => {
  const session = await sessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    await sessionCollection.findByIdAndDelete({ _id: sessionId });
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createUserSession();

  await sessionCollection.deleteOne({ _id: sessionId, refreshToken });

  return await sessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

function createUserSession() {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRD_DAYS),
  };
}
