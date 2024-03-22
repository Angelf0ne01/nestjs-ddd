import { INestMicroservice } from '@nestjs/common';
import { Test } from '@nestjs/testing';

describe('AppController (e2e)', () => {
  let app: INestMicroservice;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [],
    }).compile();

    app = moduleFixture.createNestMicroservice({});
    await app.init();
  });

  it('dummy', async () => {
    expect(app).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
