export const getStringFromQuery = (value: unknown): string | undefined => {
  return typeof value === 'string' ? value : undefined;
};

export const getBooleanFromQuery = (value: unknown): boolean | undefined => {
  if (typeof value === 'boolean') return value;

  if (typeof value === 'string') {
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;
  }

  return undefined;
};
