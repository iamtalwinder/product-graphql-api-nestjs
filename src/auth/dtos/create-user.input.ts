import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsIn } from 'class-validator';
import { UserRole } from 'src/user';
import { RegisterInput } from './register.input';

@InputType()
export class CreateUserInput extends RegisterInput {
  @Field(() => UserRole)
  @IsEnum(UserRole)
  @IsIn([UserRole.customer, UserRole.manager])
  role: UserRole;
}
