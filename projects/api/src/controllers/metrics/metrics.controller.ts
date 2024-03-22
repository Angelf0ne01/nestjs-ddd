import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { register, Gauge } from 'prom-client';

const cpuUsage = new Gauge({
  name: 'cpu_usage',
  help: 'CPU usage in percentage',
});

const memoryUsage = new Gauge({
  name: 'memory_usage',
  help: 'Memory usage in megabytes',
});

@ApiTags('metrics')
@Controller('metrics')
export class HealthMetricsApiController {
  constructor() {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Metrics fetched',
  })
  public async metrics() {
    const memoriaUsadaMB =
      Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100;

    cpuUsage.set(process.cpuUsage().user / 1_000_000);
    memoryUsage.set(memoriaUsadaMB);

    return register.metrics();
  }
}
