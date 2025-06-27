import createHttpError from 'http-errors';
import { contactsCollection } from '../db/models/contacts';
import {
  CreateContact,
  QueryParams,
  UpdateContact,
} from '../types/contactType';
import { calculatePaginationData } from '../utils/calculatePaginationData';
import { SORT_ORDER } from '../constants/constants';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}: QueryParams) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = contactsCollection.find();

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.userId) {
    contactsQuery.where('userId').equals(filter.userId);
  }

  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const contactsCount = await contactsCollection
    .find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  if (!contacts) {
    throw createHttpError(404, 'Contacts not found');
  }

  return {
    data: contacts,
    ...paginationData,
  };
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
) => {
  const result = await contactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    { includeResultMetadata: true },
  );

  if (!result.value) {
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
