import { InputType, Field, ID } from '@nestjs/graphql';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { InventoryLocationInput } from './inventory-location.input';
import { Type } from 'class-transformer';
import { InventoryLocation } from '../entities';

@InputType()
export class InventoryInput {
  @Field(() => ID)
  @IsString()
  product: string;

  @Field(() => [InventoryLocationInput])
  @Type(() => InventoryLocation)
  @IsArray()
  @ValidateNested()
  inventoryLocations: InventoryLocationInput[];
}
