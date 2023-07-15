import { Schema, Document } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, SchemaFactory, Schema as SchemaDecorator } from '@nestjs/mongoose';
import { Base } from 'src/common';

@ObjectType({ 
  description: 'Represents a product in the system, including details like name, SKU, price, and category.',
})
@SchemaDecorator()
export class Product extends Base {
  @Field({ description: 'The name of the product.' })
  @Prop({ required: true })
  name: string;

  @Field({ description: 'A unique stock keeping unit identifier for the product.' })
  @Prop({ required: true, unique: true })
  sku: string;

  @Field({ nullable: true, description: 'An optional description of the product.' })
  @Prop()
  description?: string;

  @Field({ description: 'The price of the product.' })
  @Prop({ required: true })
  price: number;

  @Field(() => String, { nullable: true, description: 'The category of the product. Optional.' })
  @Prop(String)
  category?: string;

  @Field(() => [String], { nullable: 'itemsAndList', description: 'A list of image URLs for the product. Optional.' })
  @Prop([String])
  images?: string[];

  @Field(() => [String], { nullable: 'itemsAndList', description: 'A list of tags associated with the product. Optional.' })
  @Prop([String])
  tags?: string[];

  @Field({ description: 'The date and time when the product was created.' })
  createdAt: Date;

  @Field({ description: 'The date and time when the product was last updated.' })
  updatedAt: Date;
}

export type ProductDocument = Product & Document;

export const ProductSchema: Schema = SchemaFactory.createForClass(Product);
