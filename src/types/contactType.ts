type ContactType = 'work' | 'home' | 'personal';

export interface CreateContact {
  name: string;
  phoneNumber: string;
  email?: string;
  isFavourite?: boolean;
  contactType: ContactType;
}

export type UpdateContact = Partial<CreateContact>;
