import { Module } from '@nestjs/common';
import { HealthMetricsApiController } from './metrics.controller';

@Module({
  imports: [],
  controllers: [HealthMetricsApiController],
})
export class MetricsApiModule {}
