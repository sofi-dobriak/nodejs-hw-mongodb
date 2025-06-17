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

const contactsRouters = Router();

contactsRouters.get('/contacts', getContactsController);

contactsRouters.get(
  '/contacts/:contactId',
  isValidId,
  getContactByIDController,
);

contactsRouters.post(
  '/contacts',
  validateBody(createContactSchema),
  createContactController,
);

contactsRouters.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  updateContactController,
);

contactsRouters.delete(
  '/contacts/:contactId',
  isValidId,
  deleteContactController,
);

export default contactsRouters;
