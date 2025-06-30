import createHttpError from 'http-errors';
import { contactsCollection } from '../db/models/contacts';
import {
  CreateContact,
  GetDeleteContactByID,
  QueryParams,
  UpdateContact,
} from '../types/contactType';
import { calculatePaginationData } from '../utils/calculatePaginationData';
import { SORT_ORDER } from '../constants/constants';
import { Types } from 'mongoose';

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

  if (filter.userId) {
    contactsQuery.where('userId').equals(filter.userId);
  }

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

export const getContactByID = async ({
  _id: contactId,
  userId,
}: GetDeleteContactByID) => {
  const contact = await contactsCollection.findOne({ _id: contactId, userId });

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
  userId: Types.ObjectId,
  payload: UpdateContact,
) => {
  const result = await contactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    { new: true, includeResultMetadata: true },
  );

  if (!result.value) {
    throw createHttpError(404, 'Contact not found');
  }

  return result.value;
};

export const deleteContact = async ({
  _id: contactId,
  userId,
}: GetDeleteContactByID) => {
  const contact = await contactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
};
