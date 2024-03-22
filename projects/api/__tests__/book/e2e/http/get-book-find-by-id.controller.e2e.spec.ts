import { BookNotExistError } from '@shared/entities/book/domain/exceptions/book-not-exist';
import request from 'supertest';
import { app } from '../../../../jest-e2e.setup';
import { INVALID_ID_MOCK } from '../../mocks';
import { createAndReturnBook } from '../helpers';

describe('GetBookFindOneById', () => {
  it('should return an error when id is invalid', async () => {
    const response = await request(app.getHttpServer())
      .get(`/book/${INVALID_ID_MOCK}`)
      .expect(404);
    expect(response.body.message).toBe(new BookNotExistError().message);
  });

  it('should return a book', async () => {
    const book = await createAndReturnBook();

    const {
      body: { data },
    } = await request(app.getHttpServer()).get(`/book/${book.id}`).expect(200);

    expect(data).toMatchObject(book);
  });
});
