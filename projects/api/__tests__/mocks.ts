import { v4 as uuid } from 'uuid';

export const AUTHOR_ID = uuid();
export const AUTH_ID = uuid();
export const DISTRIBUTOR_ID = uuid();
export const INVALID_ID_MOCK = uuid();
export const UPDATE_ID = uuid();

export const AUTHOR_MOCK = {
  id: AUTHOR_ID,
  name: 'author-test-name',
  enable: true,
};

export const AUTH_MOCK = {
  id: AUTH_ID,
  distributor_id: DISTRIBUTOR_ID,
};
