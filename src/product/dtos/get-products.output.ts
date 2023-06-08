import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from '../entities';

@ObjectType()
export class GetProductsOutput {
  @Field(() => [Product])
  documents: Product[];

  @Field()
  totalCount: number;
}
