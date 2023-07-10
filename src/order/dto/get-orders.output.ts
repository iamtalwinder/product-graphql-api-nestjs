import { Field, ObjectType } from '@nestjs/graphql';
import { Order } from '../entities';

@ObjectType()
export class GetOrdersOutput {
  @Field(() => [Order])
  documents: Order[];

  @Field()
  totalCount: number;
}
