import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemInput } from './order-items.input';

@InputType({ description: 'Input type for placing an order, including items to order and the shipping address.' })
export class PlaceOrderInput {
  @Field(() => [OrderItemInput], { description: 'A list of items to be included in the order.' })
  @Type(() => OrderItemInput)
  @IsArray()
  @ValidateNested({ each: true })
  items: OrderItemInput[];

  @Field(() => String, { description: 'The shipping address for the order.' })
  @IsString()
  shippingAddress: string;

  static getProductIds(input: PlaceOrderInput): string[] {
    return input.items.map((items: OrderItemInput) => items.productId);
  }
}
