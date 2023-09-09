import { Controller, Get, Logger } from '@nestjs/common';
import { StockService } from './stock.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NewOrderDto } from 'apps/orders/src/dtos';

@Controller()
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  getHello(): string {
    return this.stockService.getHello();
  }

  @MessagePattern('new-order')
  async handleNewOrder(@Payload('payload') payload: { order: NewOrderDto }) {
    Logger.debug(
      `New order recieved! item: ${payload.order.item}, quantity: ${payload.order.quantity} `,
      'Stock',
    );
  }
}
