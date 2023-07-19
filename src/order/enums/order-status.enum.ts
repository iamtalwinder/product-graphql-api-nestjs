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
  description: 'The status of an order through its lifecycle.',
  valuesMap: {
    Pending: { description: 'Order has been placed but not yet processed.' },
    Confirmed: { description: 'Order has been confirmed.' },
    Packed: { description: 'Order has been packed and is ready for shipping.' },
    Shipped: { description: 'Order has been shipped and is in transit.' },
    Delivered: { description: 'Order has been delivered to the recipient.' },
    Cancelled: { description: 'Order has been cancelled.' },
  },
});
