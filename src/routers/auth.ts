import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/auth';
import { loginUserSchema, registerUserSchema } from '../validation/usersSchema';
import {
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth';

const authPage = Router();

authPage.post(
  '/auth/register',
  validateBody(registerUserSchema),
  registerUserController,
);

authPage.post(
  '/auth/login',
  validateBody(loginUserSchema),
  loginUserController,
);

authPage.post('/auth/logout', logoutUserController);

authPage.post('/auth/refresh', refreshUserSessionController);

authPage.post(
  '/auth/send-reset-email',
  validateBody(requestResetEmailSchema),
  requestResetEmailController,
);

authPage.post(
  '/auth/reset-pwd',
  validateBody(resetPasswordSchema),
  resetPasswordController,
);

export default authPage;
