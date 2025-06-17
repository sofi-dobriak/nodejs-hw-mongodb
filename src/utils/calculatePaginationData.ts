export const calculatePaginationData = (
  count: number,
  perPage: number,
  page: number,
) => {
  const totalPages = Math.ceil(count / perPage);
  const hasNextPage = Boolean(totalPages - page);
  const hasPreviousPage = page !== 1;

  return {
    page,
    perPage,
    totalContacts: count,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};
