import { v4 as uuid } from 'uuid';
import { Schema, Document } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';

import {
  SchemaFactory,
  Schema as SchemaDecorator,
  Prop,
} from '@nestjs/mongoose';

@ObjectType()
@SchemaDecorator({
  timestamps: true,
})
export class Product {
  @Field(() => ID)
  @Prop({
    default: uuid,
  })
  id: string;

  @Field()
  @Prop({
    required: true,
  })
  name: string;

  @Field({ nullable: true })
  @Prop({
    required: false,
  })
  description?: string;
}

export interface ProductDocument extends Product, Document<string> {
  _id: string;
  id: string;
}

export const ProductSchema: Schema = SchemaFactory.createForClass(Product);
