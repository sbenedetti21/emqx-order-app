import { Inject, Injectable, Logger } from '@nestjs/common';
import { NewOrderDto } from './dtos';
import { ClientProxy, MqttRecordBuilder } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(@Inject('orders_service') private readonly client: ClientProxy) {}

  getHello(): string {
    return 'Hello World!';
  }

  async newOrder(newOrderDto: NewOrderDto) {
    const topicString = 'new-order';
    const mqttRecord = new MqttRecordBuilder()
      .setQoS(2)
      .setData({
        topic: 'new-order',
        payload: {
          order: newOrderDto,
        },
      })
      .build();

    await lastValueFrom(this.client.emit(topicString, mqttRecord));

    Logger.debug(`Send event to topic: ${topicString}`, 'Orders');

    return 'OK';
  }
}
