import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema as SchemaDecorator } from '@nestjs/mongoose';

@ObjectType({
  description:
    'Represents a location within an inventory, including details like location name, warehouse address, and quantity of items.',
})
@SchemaDecorator()
export class InventoryLocation {
  @Field({ description: 'The name of the inventory location.' })
  @Prop({ required: true })
  locationName: string;

  @Field({ description: 'The address of the warehouse associated with this location.' })
  @Prop({ required: true })
  warehouseAddress: string;

  @Field(() => Int, { description: 'The quantity of the specific item available at this location.' })
  @Prop({ required: true })
  quantity: number;

  @Field({ nullable: true, description: 'The manager responsible for this inventory location. Optional.' })
  @Prop()
  manager: string;

  @Field({ nullable: true, description: 'Additional notes about the inventory location. Optional.' })
  @Prop({ required: false })
  notes?: string;
}
