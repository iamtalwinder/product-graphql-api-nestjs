import { InputType, Field, Float } from '@nestjs/graphql';
import { IsString, IsArray, IsNumber, Min, IsUrl } from 'class-validator';

@InputType()
export class ProductInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  sku: string;

  @Field({ nullable: true })
  @IsString()
  description?: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  price: number;

  @Field(() => String, { nullable: true })
  @IsString()
  category?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  @IsArray()
  @IsUrl({}, { each: true })
  images?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
