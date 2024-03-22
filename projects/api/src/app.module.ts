import { HealthCheckApiModule } from '@api/controllers/healthcheck/healthcheck.module';
import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { RabbitmqModule } from '@shared/clients/rabbitmq';
import {
  TypeOrmConfigService,
  TypeOrmConfiguration,
  TypeOrmModule,
} from '@shared/clients/typeorm';
import { AuthModule } from '@shared/utils/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BookApiModule } from './controllers/book/book.module';
import { MetricsApiModule } from './controllers/metrics/metrics';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [TypeOrmConfiguration],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    HealthCheckApiModule,
    RabbitmqModule,
    BookApiModule,
    MetricsApiModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      // eslint-disable-next-line @darraghor/nestjs-typed/should-specify-forbid-unknown-values
      useValue: new ValidationPipe({
        whitelist: false,
        forbidUnknownValues: false,
      }),
    },
  ],
})
export class AppModule {}
