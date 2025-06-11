import { Router } from 'express';
import contactsRouters from './contacts';

const router = Router();
router.use(contactsRouters);

export default router;
