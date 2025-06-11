import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getContactByIDController,
  getContactsController,
  updateContactController,
} from '../controllers/contacts';

const contactsRouters = Router();

contactsRouters.get('/contacts', getContactsController);
contactsRouters.get('/contacts/:contactId', getContactByIDController);
contactsRouters.post('/contacts', createContactController);
contactsRouters.patch('/contacts/:contactId', updateContactController);
contactsRouters.delete('/contacts/:contactId', deleteContactController);

export default contactsRouters;
