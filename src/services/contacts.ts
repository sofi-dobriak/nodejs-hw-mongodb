import createHttpError from 'http-errors';
import { contactsCollection } from '../db/models/contacts';
import { CreateContact, UpdateContact } from '../types/contactType';

export const getAllContacts = async () => {
  const contacts = await contactsCollection.find();

  if (!contacts) {
    throw createHttpError(404, 'Contacts not found');
  }

  return contacts;
};

export const getContactByID = async (contactId: string) => {
  const contact = await contactsCollection.findById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  return contact;
};

export const createContact = async (payload: CreateContact) => {
  const contact = await contactsCollection.create(payload);
  return contact;
};

export const updateContact = async (
  contactId: string,
  payload: UpdateContact,
  options = {},
) => {
  const result = await contactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!result || !result.value) {
    throw createHttpError(404, 'Contact not found');
  }

  return result.value;
};

export const deleteContact = async (contactId: string) => {
  const contact = await contactsCollection.findByIdAndDelete(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
};
