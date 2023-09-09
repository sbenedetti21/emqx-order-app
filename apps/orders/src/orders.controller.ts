import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { NewOrderDto } from './dtos';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getHello(): string {
    return this.ordersService.getHello();
  }

  @Post()
  async newOrder(@Body() newOrderDto: NewOrderDto) {
    return this.ordersService.newOrder(newOrderDto);
  }
}
