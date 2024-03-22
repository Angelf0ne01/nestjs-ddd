import { v4 as uuid } from 'uuid';

export const BOOK_ID = uuid();
export const INVALID_ID_MOCK = uuid();

export const BOOK_MOCK = {
  id: BOOK_ID,
  title: 'Book test title',
};
