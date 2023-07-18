import { InputType, Field, Float } from '@nestjs/graphql';
import { IsString, IsArray, IsNumber, Min, IsUrl } from 'class-validator';

@InputType({ description: 'Input type for creating or updating product details.' })
export class ProductInput {
  @Field({ description: 'The name of the product.' })
  @IsString()
  name: string;

  @Field({ description: 'A unique stock keeping unit identifier for the product.' })
  @IsString()
  sku: string;

  @Field({ nullable: true, description: 'An optional description of the product.' })
  @IsString()
  description?: string;

  @Field(() => Float, { description: 'The price of the product.' })
  @IsNumber()
  @Min(0)
  price: number;

  @Field(() => String, { nullable: true, description: 'The category of the product. Optional.' })
  @IsString()
  category?: string;

  @Field(() => [String], { nullable: 'itemsAndList', description: 'A list of image URLs for the product. Optional.' })
  @IsArray()
  @IsUrl({}, { each: true })
  images?: string[];

  @Field(() => [String], {
    nullable: 'itemsAndList',
    description: 'A list of tags associated with the product. Optional.',
  })
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
