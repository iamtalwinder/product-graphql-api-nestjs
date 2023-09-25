import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { BaseFixture } from '@nestjs-cucumber-kit/core';
import { Order, OrderDocument } from 'src/order';
import { OrderStatus } from 'src/order/enums';

export default class OrderFixture extends BaseFixture {
  async apply(): Promise<void> {
    const orderModel: Model<OrderDocument> = this.app.get(getModelToken(Order.name));

    const orders: Order[] = [
      {
        _id: 'order1',
        user: '2',
        products: [
          {
            product: 'p1',
            quantity: 2,
            price: 20.0
          }
        ],
        shippingAddress: '1234 Main St',
        status: OrderStatus.Pending,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: 'order2',
        user: '2',
        products: [
          {
            product: 'p2',
            quantity: 1,
            price: 50.0
          }
        ],
        shippingAddress: '5678 Second St',
        status: OrderStatus.Shipped,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    await orderModel.insertMany(orders);
  }
}
