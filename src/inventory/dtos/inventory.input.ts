import { InputType, Field, ID } from '@nestjs/graphql';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { InventoryLocationInput } from './inventory-location.input';
import { InventoryLocation } from '../entities';

@InputType({
  description: 'Input type for creating or updating inventory, including the product ID and its locations.',
})
export class InventoryInput {
  @Field(() => ID, { description: 'The unique identifier of the product.' })
  @IsString()
  product: string;

  @Field(() => [InventoryLocationInput], { description: 'List of inventory locations for the product.' })
  @Type(() => InventoryLocation)
  @IsArray()
  @ValidateNested()
  inventoryLocations: InventoryLocationInput[];
}
