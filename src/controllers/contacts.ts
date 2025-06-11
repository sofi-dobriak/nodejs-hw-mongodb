import { RequestHandler } from 'express';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactByID,
  updateContact,
} from '../services/contacts';

export const getContactsController: RequestHandler = async (req, res) => {
  const contacts = await getAllContacts();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIDController: RequestHandler = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactByID(contactId);

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController: RequestHandler = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const updateContactController: RequestHandler = async (req, res) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};

export const deleteContactController: RequestHandler = async (req, res) => {
  const { contactId } = req.params;
  await deleteContact(contactId);

  res.status(204).send();
};
