import { ParsedQs } from 'qs';
import { getStringFromQuery } from './getTypeFromQuery';

const parseNumber = (
  number: string | undefined,
  defaultValue: number,
): number => {
  if (typeof number !== 'string') return defaultValue;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) return defaultValue;

  return parsedNumber;
};

export const parsePaginationParams = (query: ParsedQs) => {
  const page = getStringFromQuery(query.page);
  const perPage = getStringFromQuery(query.perPage);

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
