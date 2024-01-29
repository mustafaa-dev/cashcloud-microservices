import { NestFactory } from '@nestjs/core';
import { StoresModule } from './stores.module';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(StoresModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RMQ_URI')],
      noAck: false,
      queue: 'stores',
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
}

bootstrap();
