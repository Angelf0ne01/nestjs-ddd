import { AppModule } from '@api/app.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

export let app: INestApplication;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();

  await app.init();
});

afterAll(async () => {
  await app.close();
});
