import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema as SchemaDecorator, SchemaFactory } from '@nestjs/mongoose';
import { Schema, Document } from 'mongoose';
import { Base } from 'src/common';
import { User } from 'src/user';
import { OrderStatus } from '../enums';
import { OrderItem } from './order-item';

@ObjectType({
  description: 'Represents an order placed by a user, including details like products, shipping address, and status.',
})
@SchemaDecorator()
export class Order extends Base {
  @Field(() => User, { description: 'The user who placed the order.' })
  @Prop({ type: String, ref: User.name, required: true })
  user: User | string;

  @Field(() => [OrderItem], { description: 'The list of items included in the order.' })
  @Prop({ required: true, type: [OrderItem], default: [] })
  products: OrderItem[];

  @Field(() => String, { description: 'The shipping address for the order.' })
  @Prop({ required: true })
  shippingAddress: string;

  @Field(() => OrderStatus, { description: 'The current status of the order.' })
  @Prop({ required: true, type: String, enum: OrderStatus })
  status: OrderStatus;

  @Field({ description: 'The date and time when the order was created.' })
  createdAt: Date;

  @Field({ description: 'The date and time when the order was last updated.' })
  updatedAt: Date;
}

export type OrderDocument = Order & Document;

export const OrderSchema: Schema = SchemaFactory.createForClass(Order);
