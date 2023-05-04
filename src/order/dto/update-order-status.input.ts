import { InputType, PartialType, OmitType, Field, ID } from '@nestjs/graphql';
import { Order } from '../order.model';

@InputType()
export class UpdateOrderStatusInput extends PartialType(
  OmitType(Order, ['items', 'orderDate', 'totalPrice'] as const),
) {
  @Field(() => ID)
  id: string;

  @Field()
  status: string;
}
