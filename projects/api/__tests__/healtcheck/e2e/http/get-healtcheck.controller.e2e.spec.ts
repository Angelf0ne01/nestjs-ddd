import { HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { app } from '../../../../jest-e2e.setup';

describe('HealthCheckApiController (e2e)', () => {
  it('should return 200 status code ', async () => {
    const result = await request(app.getHttpServer()).get(`/health`);
    expect(result.status).toBe(HttpStatus.OK);
  });
});
