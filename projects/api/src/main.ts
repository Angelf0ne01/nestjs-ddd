import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SentryFilter } from '@shared/clients/sentry/sentry.filter';
import { AppModule } from './app.module';
import { setupSwagger } from './configurations/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new SentryFilter(httpAdapter));

  app.enableCors();
  app.setGlobalPrefix('v1');

  if (process.env.PRODUCTION !== 'true') {
    setupSwagger(app);
  }

  await app.listen(process.env.PORT || 4040);
}

bootstrap();
