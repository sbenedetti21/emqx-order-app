import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    ClientsModule.registerAsync([
      {
        name: 'billing_service',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.MQTT,
          options: {
            url: configService.getOrThrow<string>('QUEUE_URL'),
          },
        }),
      },
    ]),
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
