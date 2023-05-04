import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => ID)
  id: string;

  @Field(() => [String])
  itemIds: string[];

  @Field()
  orderDate: Date;

  @Field()
  totalPrice: number;

  @Field()
  status: string;
}
