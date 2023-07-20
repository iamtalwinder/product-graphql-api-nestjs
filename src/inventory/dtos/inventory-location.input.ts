import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNumber, Min, IsOptional } from 'class-validator';

@InputType({
  description:
    'Input type for specifying a location in the inventory, including details like location name, address, and quantity.',
})
export class InventoryLocationInput {
  @Field({ description: 'The name of the inventory location.' })
  @IsString()
  locationName: string;

  @Field({ description: 'The address of the warehouse associated with this location.' })
  @IsString()
  warehouseAddress: string;

  @Field(() => Int, { description: 'The quantity of the specific item available at this location.' })
  @IsNumber()
  @Min(0)
  quantity: number;

  @Field({ nullable: true, description: 'The manager responsible for this inventory location. Optional.' })
  @IsString()
  @IsOptional()
  manager: string;

  @Field({ nullable: true, description: 'Additional notes about the inventory location. Optional.' })
  @IsString()
  @IsOptional()
  notes?: string;
}
