import createHttpError from 'http-errors';
import { userCollection } from '../db/models/user';
import { User } from '../types/users';
import bcrypt from 'bcrypt';
import { sessionCollection } from '../db/models/session';
import { randomBytes } from 'crypto';
import {
  FIFTEEN_MINUTES,
  SMTP,
  TEMPLATES_DIR,
  THIRD_DAYS,
} from '../constants/constants';
import { RefreshSession } from '../types/session';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getEnvVariables } from '../utils/getEnvVariables';
import path from 'node:path';
import fs from 'node:fs/promises';
import handlebars from 'handlebars';
import { sendEmail } from '../utils/sendEmail';

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
    throw createHttpError(404, 'User not found');
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

export const requestResetToken = async (email: string) => {
  const user = await userCollection.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    getEnvVariables('JWT_SECRET'),
    {
      expiresIn: '5m',
    },
  );

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'resetPasswordEmail.html',
  );

  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();

  const template = handlebars.compile(templateSource);

  const html = template({
    name: user.name,
    link: `${getEnvVariables('APP_DOMAIN')}/reset-password?token=${resetToken}`,
  });

  return await sendEmail({
    from: getEnvVariables(SMTP.SMTP_FROM),
    to: email,
    subject: 'Reset your password',
    html,
  });
};

export const resetPassword = async (payload: JwtPayload) => {
  let entries;

  try {
    entries = jwt.verify(payload.token, getEnvVariables('JWT_SECRET'));
  } catch (error) {
    throw createHttpError(401, 'Token is expired or invalid.');
  }

  if (typeof entries === 'string' || !entries.email || !entries.sub) {
    throw createHttpError(401, 'Invalid token payload');
  }

  const user = await userCollection.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) throw createHttpError(404, 'User not found');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await sessionCollection.deleteOne({ userId: user._id });

  return await userCollection.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );
};
