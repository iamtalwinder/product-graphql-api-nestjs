import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Product } from '../product/product.model';

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string;

  @Field(() => [Product])
  items: Product[];

  @Field()
  orderDate: Date;

  @Field()
  totalPrice: number;

  @Field()
  status: string;
}
