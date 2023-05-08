import { Injectable } from '@nestjs/common';
import { UpdateOrderStatusInput } from './dto/update-order-status.input';
import { CreateOrderInput } from './dto/create-order.input';

@Injectable()
export class OrderService {
  public create(createOrderInput: CreateOrderInput) {
    return {
      id: '1',
      items: ['1'],
      orderDate: new Date(),
      totalPrice: 123,
      status: 'paid',
    };
  }

  public findOneById(id: string) {
    return {
      id,
      items: ['1'],
      orderDate: new Date(),
      totalPrice: 123,
      status: 'paid',
    };
  }

  public updateStatus({ id, status }: UpdateOrderStatusInput) {
    return { id, items: ['1'], orderDate: new Date(), totalPrice: 123, status };
  }

  public remove(id: string) {
    return { id, items: ['1'], orderDate: new Date(), totalPrice: 123, status };
  }

  public findAll() {
    return [
      {
        id: '1',
        items: ['1'],
        orderDate: new Date(),
        totalPrice: 123,
        status: 'paid',
      },
    ];
  }
}
