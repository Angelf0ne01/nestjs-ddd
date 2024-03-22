import { Module } from '@nestjs/common';
import { RabbitmqModule } from '@shared/clients/rabbitmq';
import {
  TypeOrmConfigService,
  TypeOrmConfiguration,
  TypeOrmModule,
} from '@shared/clients/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LogEventWorkerModule } from './controller/log-events/log-events.module';
import { BookWorkerModule } from './controller/book/book.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [TypeOrmConfiguration],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    RabbitmqModule,
    LogEventWorkerModule,
    BookWorkerModule,
  ],
})
export class AppModule {}
