import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateOrderStatusInput {
  @Field(() => ID)
  id: string;

  @Field()
  status: string;
}
