import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
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
    consfigService.getOrThrow<number>('APP_BILLING_PORT'),
    consfigService.getOrThrow<string>('APP_BILLING_ADDRESS'),
  );

  Logger.verbose(
    `🚀 Billing App is running on: ${await app.getUrl()}, at ${new Date().getTimezoneOffset()}`,
  );
}
bootstrap();
