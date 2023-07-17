import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Prop, Schema as SchemaDecorator } from '@nestjs/mongoose';
import { Product } from 'src/product';

@ObjectType()
@SchemaDecorator()
export class OrderItem {
  @Field(() => Product)
  @Prop({ type: String, ref: Product.name, required: true })
  product: Product | string;

  @Field(() => Int)
  @Prop({ required: true })
  quantity: number;

  @Field(() => Float)
  @Prop({ required: true })
  price: number;
}
