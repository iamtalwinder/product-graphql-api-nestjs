import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType({ description: 'Input type for filtering inventory records by product ID.' })
export class InventoryFilterInput {
  @Field({ description: 'The unique identifier of the product to filter inventory records.' })
  @IsString()
  product: string;
}
