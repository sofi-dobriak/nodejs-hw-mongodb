export type ContactType = 'work' | 'home' | 'personal';

export interface CreateContact {
  name: string;
  phoneNumber: string;
  email?: string;
  isFavourite?: boolean;
  contactType: ContactType;
}

export type UpdateContact = Partial<CreateContact>;

interface FilterType {
  contactType?: ContactType;
  isFavourite?: boolean;
}

export interface QueryParams {
  page: number;
  perPage: number;
  sortOrder: string;
  sortBy?: string;
  filter: FilterType;
}
