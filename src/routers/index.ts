import { Router } from 'express';
import contactsRouters from './contacts';
import homePageRoutes from './homePage';
import authPage from './auth';

const router = Router();
router.use(homePageRoutes);
router.use(contactsRouters);
router.use(authPage);

export default router;
