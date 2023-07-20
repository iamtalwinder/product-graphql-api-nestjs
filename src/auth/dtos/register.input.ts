import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType({ description: 'Input type for user registration, including email, password, first name, and last name.' })
export class RegisterInput {
  @Field({ description: 'The user\'s email address.' })
  @IsEmail()
  email: string;

  @Field({ description: 'The user\'s password.' })
  @IsString()
  @MinLength(6)
  password: string;

  @Field({ description: 'The user\'s first name.' })
  @IsString()
  firstName: string;

  @Field({ description: 'The user\'s last name.' })
  @IsString()
  lastName: string;
}
