import { InputType, Field, ID } from '@nestjs/graphql';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { InventoryLocationInput } from './inventory-location.input';
import { Type } from 'class-transformer';
import { InventoryLocation } from '../entities';

@InputType()
export class InventoryInput {
  @Field(() => ID)
  @IsString()
  productId: string;

  @Field(() => [InventoryLocationInput])
  @Type(() => InventoryLocation)
  @IsArray({ each: true })
  @ValidateNested()
  inventoryLocations: InventoryLocationInput[];
}
