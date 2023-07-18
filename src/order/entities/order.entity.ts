import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema as SchemaDecorator, SchemaFactory } from '@nestjs/mongoose';
import { Schema, Document } from 'mongoose';
import { Base } from 'src/common';
import { User } from 'src/user';
import { OrderStatus } from '../enums';
import { OrderItem } from './order-item';

@ObjectType()
@SchemaDecorator()
export class Order extends Base {
  @Field(() => User)
  @Prop({ type: String, ref: User.name, required: true })
  user: User | string;

  @Field(() => [OrderItem])
  @Prop({ required: true, type: [OrderItem], default: [] })
  products: OrderItem[];

  @Field(() => String)
  @Prop({ required: true })
  shippingAddress: string;

  @Field(() => OrderStatus)
  @Prop({ required: true, type: String, enum: OrderStatus })
  status: OrderStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type OrderDocument = Order & Document;

export const OrderSchema: Schema = SchemaFactory.createForClass(Order);
