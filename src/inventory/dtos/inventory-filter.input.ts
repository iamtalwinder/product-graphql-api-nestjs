import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class InventoryFilterInput {
  @Field()
  @IsString()
  product: string;
}