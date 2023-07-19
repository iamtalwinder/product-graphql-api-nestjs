import { Field, ObjectType } from '@nestjs/graphql';
import { Order } from '../entities';

@ObjectType({ description: 'Output type for retrieving orders. Includes a list of orders and the total count.' })
export class GetOrdersOutput {
  @Field(() => [Order], { description: 'The list of retrieved orders.' })
  documents: Order[];

  @Field({ description: 'The total count of orders available, considering the applied filters.' })
  totalCount: number;
}
