import path from 'node:path';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:5050',
      package: 'grpc.health.v1',
      // eslint-disable-next-line unicorn/prefer-module
      protoPath: path.join(__dirname, 'controller/healthcheck/health.proto'),
    },
  });

  await app.startAllMicroservices();

  await app.init();
}

bootstrap()
  // eslint-disable-next-line no-console
  .then(() => console.log('@integrations-bidi-book/worker server started!'))
  .catch(error => {
    throw new Error(error);
  });
