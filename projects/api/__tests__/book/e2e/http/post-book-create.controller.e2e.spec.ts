import request from 'supertest';
import { app } from '../../../../jest-e2e.setup';
import { createAndReturnBook } from '../helpers';

describe('PostBookCreateController', () => {
  it('should create a new book', async () => {
    const book = await createAndReturnBook();

    const {
      body: { data },
    } = await request(app.getHttpServer()).get(`/book/${book.id}`).expect(200);

    expect(data).toMatchObject(book);
  });
});
