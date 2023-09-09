import { Controller, Get, Logger } from '@nestjs/common';
import { BillingService } from './billing.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NewOrderDto } from 'apps/orders/src/dtos';

@Controller()
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get()
  getHello(): string {
    return this.billingService.getHello();
  }

  @MessagePattern('new-order')
  async handleNewOrder(@Payload('payload') payload: { order: NewOrderDto }) {
    Logger.debug(
      `New order recieved! item: ${payload.order.item}, quantity: ${payload.order.quantity} `,
      'Billing',
    );
  }
}
