import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNumber, Min, IsOptional } from 'class-validator';

@InputType()
export class InventoryLocationInput {
  @Field()
  @IsString()
  locationName: string;

  @Field()
  @IsString()
  warehouseAddress: string;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  quantity: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  manager: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  notes?: string;
}
