import { NestFactory } from '@nestjs/core';
import { StockModule } from './stock.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(StockModule);
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
    consfigService.getOrThrow<number>('APP_STOCK_PORT'),
    consfigService.getOrThrow<string>('APP_STOCK_ADDRESS'),
  );

  Logger.verbose(
    `🚀 Stock App is running on: ${await app.getUrl()}, at ${new Date().getTimezoneOffset()}`,
  );
}
bootstrap();
