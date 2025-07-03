import { RequestHandler } from 'express';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactByID,
  updateContact,
} from '../services/contacts';
import { parsePaginationParams } from '../utils/parsePaginationParams';
import { parseSortParams } from '../utils/parseSortParams';
import { parseFilterParams } from '../utils/parseFilterParams';
import createHttpError from 'http-errors';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir';
import { getEnvVariables } from '../utils/getEnvVariables';
import { saveFileToCloudinary } from '../utils/sevaFileToCloudinary';

export const getContactsController: RequestHandler = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  if (!req.user) {
    throw createHttpError(401, 'User not authenticated');
  }

  const contacts = await getAllContacts({
    page,
    perPage,
    sortOrder,
    sortBy,
    filter: { ...filter, userId: req.user._id },
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIDController: RequestHandler = async (req, res) => {
  const { contactId } = req.params;

  if (!req.user) {
    throw createHttpError(401, 'User not authenticated');
  }

  const contact = await getContactByID({
    _id: contactId,
    userId: req.user._id,
  });

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw createHttpError(401, 'User not authenticated');
  }

  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (getEnvVariables('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const contact = await createContact({
    ...req.body,
    userId: req.user._id,
    photo: photoUrl,
  });

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const updateContactController: RequestHandler = async (req, res) => {
  const { contactId } = req.params;

  if (!req.user) {
    throw createHttpError(401, 'User not authenticated');
  }

  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (getEnvVariables('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const contact = await updateContact(contactId, req.user._id, {
    ...req.body,
    photo: photoUrl,
  });

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};

export const deleteContactController: RequestHandler = async (req, res) => {
  const { contactId } = req.params;

  if (!req.user) {
    throw createHttpError(401, 'User not authenticated');
  }

  await deleteContact({
    _id: contactId,
    userId: req.user._id,
  });

  res.status(204).send();
};
