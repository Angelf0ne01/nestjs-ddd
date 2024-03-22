import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MessagingService } from './messaging.service';
import { RabbitmqConfigService } from './rabbitmq-config.service';

@Module({
  imports: [
    ConfigModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useClass: RabbitmqConfigService,
    }),
  ],
  providers: [MessagingService, RabbitmqConfigService],
  exports: [MessagingService, RabbitmqConfigService],
})
export class RabbitmqModule {}
