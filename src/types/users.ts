import { Types } from 'mongoose';

export interface User {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    userId?: Types.ObjectId;
    user?: User;
  }
}
