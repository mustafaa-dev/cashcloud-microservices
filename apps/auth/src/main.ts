import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.connectMicroservice({ transport: Transport.TCP });
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
  await app.listen(3001);
}

bootstrap();
