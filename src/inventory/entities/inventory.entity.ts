import { Schema, Document } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, SchemaFactory, Schema as SchemaDecorator } from '@nestjs/mongoose';
import { Base } from 'src/common';
import { Product } from 'src/product';
import { InventoryLocation } from './inventory-location.entity';

@ObjectType({
  description: 'Represents the inventory of a product, including all locations where the product is stored.',
})
@SchemaDecorator()
export class Inventory extends Base {
  @Field(() => Product, { description: 'The product associated with this inventory.' })
  @Prop({ type: String, ref: Product.name, required: true, unique: true })
  product: Product | string;

  @Field(() => [InventoryLocation], { description: 'A list of locations where the product is stored.' })
  @Prop({ type: [InventoryLocation], default: [] })
  inventoryLocations: InventoryLocation[];
}

export type InventoryDocument = Inventory & Document & { getTotalQuantity: Function };

export const InventorySchema: Schema = SchemaFactory.createForClass(Inventory);

InventorySchema.method('getTotalQuantity', function (this: Inventory): number {
  return this.inventoryLocations.reduce((total, location) => {
    return total + location.quantity;
  }, 0);
});
