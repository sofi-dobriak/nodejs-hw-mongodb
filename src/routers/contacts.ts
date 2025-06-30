import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getContactByIDController,
  getContactsController,
  updateContactController,
} from '../controllers/contacts';
import { validateBody } from '../middlewares/validateBody';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contactSchema';
import { isValidId } from '../middlewares/isValidId';
import { authenticate } from '../middlewares/authenticate';
import { upload } from '../middlewares/multer';

const contactsRouters = Router();
contactsRouters.use('/contacts', authenticate);

contactsRouters.get('/contacts', getContactsController);

contactsRouters.get(
  '/contacts/:contactId',
  isValidId,
  getContactByIDController,
);

contactsRouters.post(
  '/contacts',
  upload.single('photo'),
  validateBody(createContactSchema),
  createContactController,
);

contactsRouters.patch(
  '/contacts/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(updateContactSchema),
  updateContactController,
);

contactsRouters.delete(
  '/contacts/:contactId',
  isValidId,
  deleteContactController,
);

export default contactsRouters;
