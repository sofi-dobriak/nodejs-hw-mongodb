export interface User {
  name: string;
  email: string;
  password: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
    user?: User;
  }
}
