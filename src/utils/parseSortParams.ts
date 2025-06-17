import { ParsedQs } from 'qs';
import { SORT_ORDER } from '../constants/constants';
import { getStringFromQuery } from './getTypeFromQuery';

const parseSortOrder = (sortOrder?: string): string => {
  if (sortOrder === SORT_ORDER.ASC || sortOrder === SORT_ORDER.DESC) {
    return sortOrder;
  }

  return SORT_ORDER.ASC;
};

const parseSortBy = (sortBy?: string): string | undefined => {
  const keyOfSort = 'name';
  return keyOfSort === 'name' ? sortBy : '_id';
};

export const parseSortParams = (query: ParsedQs) => {
  const { sortOrder, sortBy } = query;

  const parsedSortOrder = parseSortOrder(getStringFromQuery(sortOrder));
  const parsedSortBy = parseSortBy(getStringFromQuery(sortBy));

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
