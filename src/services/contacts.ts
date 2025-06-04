import { contactsCollection } from '../db/models/contacts';

export const getAllContacts = async () => {
  const contacts = await contactsCollection.find();
  return contacts;
};

export const getContactByID = async (contactId: string) => {
  const contact = await contactsCollection.findById(contactId);

  if (!contact) {
    throw new Error(`Contact with id ${contactId} not found`);
  }

  return contact;
};
