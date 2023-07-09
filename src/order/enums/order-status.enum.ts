import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatus {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Packed = 'Packed',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
});
