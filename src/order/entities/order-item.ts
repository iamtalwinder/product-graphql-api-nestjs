import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Prop, Schema as SchemaDecorator } from '@nestjs/mongoose';
import { Product } from 'src/product';

@ObjectType({ description: 'Represents an item in an order, including the product, quantity, and price.' })
@SchemaDecorator()
export class OrderItem {
  @Field(() => Product, { description: 'The product included in the order item.' })
  @Prop({ type: String, ref: Product.name, required: true })
  product: Product | string;

  @Field(() => Int, { description: 'The quantity of the product ordered.' })
  @Prop({ required: true })
  quantity: number;

  @Field(() => Float, { description: 'The price of the product at the time of the order.' })
  @Prop({ required: true })
  price: number;
}
