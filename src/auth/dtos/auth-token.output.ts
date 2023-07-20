import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType({ description: 'Output type for authentication tokens, including access and refresh tokens.' })
export class AuthTokenOutput {
  @Field({ description: 'JWT access token for authentication.' })
  accessToken: string;

  @Field({ description: 'JWT refresh token for generating new access tokens.' })
  refreshToken: string;
}
