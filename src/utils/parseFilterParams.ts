import { ParsedQs } from 'qs';
import { getBooleanFromQuery, getStringFromQuery } from './getTypeFromQuery';

const parseType = (contactType?: string): string | undefined => {
  if (typeof contactType !== 'string') return;

  const validTypes = ['work', 'home', 'personal'];
  return validTypes.includes(contactType) ? contactType : undefined;
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
