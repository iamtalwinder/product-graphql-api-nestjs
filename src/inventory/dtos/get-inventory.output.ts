import { Field, ObjectType } from '@nestjs/graphql';
import { Inventory } from '../entities';

@ObjectType()
export class GetInventoryOutput {
  @Field(() => [Inventory])
  documents: Inventory[];

  @Field()
  totalCount: number;
}
