import { Module } from '@nestjs/common';
import { HealthCheckApiController } from './healthcheck.controller';

@Module({
  imports: [],
  controllers: [HealthCheckApiController],
})
export class HealthCheckApiModule {}
