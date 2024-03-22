import { Module } from '@nestjs/common';
import { RabbitmqModule } from '@shared/clients/rabbitmq';
import { LogEventWorkerService } from './applications/logs-events.service';

@Module({
  imports: [RabbitmqModule],
  providers: [LogEventWorkerService],
  exports: [LogEventWorkerService],
})
export class LogEventWorkerModule {}
