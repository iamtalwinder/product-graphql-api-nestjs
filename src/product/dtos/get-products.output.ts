import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from '../entities';

@ObjectType({ description: 'Output type for getting a list of products. Includes the products and the total count.' })
export class GetProductsOutput {
  @Field(() => [Product], { description: 'The list of retrieved products.' })
  documents: Product[];

  @Field({ description: 'The total count of products available, considering the applied filters.' })
  totalCount: number;
}
