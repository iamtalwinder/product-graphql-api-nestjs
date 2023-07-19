import { Field, ID, Int, InputType } from '@nestjs/graphql';
import { IsString, IsInt, Min } from 'class-validator';

@InputType({ description: 'Input type for specifying an item in an order, including the product ID and quantity.' })
export class OrderItemInput {
  @Field(() => ID, { description: 'The unique identifier of the product.' })
  @IsString()
  productId: string;

  @Field(() => Int, { description: 'The quantity of the product to order.' })
  @IsInt()
  @Min(0)
  quantity: number;
}
