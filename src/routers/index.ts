import { Router } from 'express';
import contactsRouters from './contacts';
import homePageRoutes from './homePage';

const router = Router();
router.use(contactsRouters);
router.use(homePageRoutes);

export default router;
