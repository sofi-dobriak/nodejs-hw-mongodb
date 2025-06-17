import { ParsedQs } from 'qs';
import { ContactType } from '../types/contactType';
import { getBooleanFromQuery, getStringFromQuery } from './getTypeFromQuery';

const parseType = (contactType?: string): ContactType | undefined => {
  if (typeof contactType !== 'string') return;

  const validTypes: ContactType[] = ['work', 'home', 'personal'];
  return validTypes.includes(contactType as ContactType)
    ? (contactType as ContactType)
    : undefined;
};

const parseFavourite = (isFavourite?: boolean): true | undefined => {
  return isFavourite ? true : undefined;
};

export const parseFilterParams = (query: ParsedQs) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseType(getStringFromQuery(contactType));
  const parsedIsFavourite = parseFavourite(getBooleanFromQuery(isFavourite));

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
