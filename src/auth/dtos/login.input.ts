import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType({ description: 'Input type for user login, requiring email and password.' })
export class LoginInput {
  @Field({ description: 'The user\'s email address.' })
  @IsEmail()
  email: string;

  @Field({ description: 'The user\'s password.' })
  @IsString()
  @MinLength(6)
  password: string;
}
