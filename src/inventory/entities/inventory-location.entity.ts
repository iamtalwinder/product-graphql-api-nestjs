import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema as SchemaDecorator } from '@nestjs/mongoose';

@ObjectType()
@SchemaDecorator()
export class InventoryLocation {
  @Field()
  @Prop({ required: true })
  locationName: string;

  @Field()
  @Prop({ required: true })
  warehouseAddress: string;

  @Field(() => Int)
  @Prop({ required: true })
  quantity: number;

  @Field({ nullable: true })
  @Prop()
  manager: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  notes?: string;
}
