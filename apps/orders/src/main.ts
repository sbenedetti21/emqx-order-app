import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  const consfigService = app.get(ConfigService);

  app.enableCors();
  app.connectMicroservice({
    transport: Transport.MQTT,
    options: {
      url: consfigService.getOrThrow('QUEUE_URL'),
    },
  });

  await app.startAllMicroservices();

  await app.listen(
    consfigService.getOrThrow<number>('APP_API_PORT'),
    consfigService.getOrThrow<string>('APP_API_ADDRESS'),
  );

  Logger.verbose(
    `🚀 Orders App is running on: ${await app.getUrl()}, at ${new Date().getTimezoneOffset()}`,
  );
}
bootstrap();
