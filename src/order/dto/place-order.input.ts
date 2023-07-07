import { InputType, Field, ID } from '@nestjs/graphql';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemInput } from './order-items.input';

@InputType()
export class PlaceOrderInput {
  @Field(() => [OrderItemInput])
  @Type(() => OrderItemInput)
  @IsArray()
  @ValidateNested()
  items: OrderItemInput[];

  @Field(() => String)
  @IsString()
  shippingAddress: string;

  static getProductIds(input: PlaceOrderInput): string[] {
    return input.items.map((items: OrderItemInput) => items.productId);
  }
}
