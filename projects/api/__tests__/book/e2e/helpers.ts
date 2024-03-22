import { Book } from '@shared/entities/book/domain/book';
import request from 'supertest';
import { app } from '../../../jest-e2e.setup';
import { BOOK_MOCK } from '../mocks';

const { id, title } = BOOK_MOCK;

export const createAndReturnBook = async (): Promise<Book> => {
  await request(app.getHttpServer()).post('/book').send({
    id,
    title,
  });

  const { body: bookBody } = await request(app.getHttpServer()).get(
    `/book/${BOOK_MOCK.id}`,
  );

  return bookBody.data;
};
