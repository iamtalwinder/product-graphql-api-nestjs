import { Field, ObjectType } from '@nestjs/graphql';
import { Inventory } from '../entities';

@ObjectType({
  description: 'Output type for retrieving a list of inventory records, including documents and total count.',
})
export class GetInventoryOutput {
  @Field(() => [Inventory], { description: 'The list of retrieved inventory records.' })
  documents: Inventory[];

  @Field({ description: 'The total count of inventory records available, considering the applied filters.' })
  totalCount: number;
}
