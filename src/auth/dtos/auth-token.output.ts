import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthTokenOutput {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
