import { Types } from 'mongoose';

export interface UserSession {
  _id: Types.ObjectId;
  accessToken: string;
  refreshToken: string;
  accessTokenValidUntil: Date;
  refreshTokenValidUntil: Date;
}

export interface RefreshSession {
  sessionId: string;
  refreshToken: string;
}
