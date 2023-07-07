import { Field, ID, Int, InputType } from '@nestjs/graphql';
import { IsString, IsInt, Min } from 'class-validator';

@InputType()
export class OrderItemInput {
  @Field(() => ID)
  @IsString()
  productId: string;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  quantity: number;
}
