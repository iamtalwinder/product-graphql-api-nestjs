import { Schema, Document } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, SchemaFactory, Schema as SchemaDecorator } from '@nestjs/mongoose';
import { Base } from 'src/common';

@ObjectType()
@SchemaDecorator()
export class Product extends Base {
  @Field()
  @Prop({
    required: true,
  })
  name: string;

  @Field()
  @Prop({ required: true, unique: true })
  sku: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;

  @Field()
  @Prop({
    required: true,
  })
  price: number;

  @Field(() => String, { nullable: true })
  @Prop(String)
  category?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  @Prop([String])
  images?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  @Prop([String])
  tags?: string[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export type ProductDocument =  Product & Document;

export const ProductSchema: Schema = SchemaFactory.createForClass(Product);
