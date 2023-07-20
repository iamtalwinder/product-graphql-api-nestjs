import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsIn } from 'class-validator';
import { UserRole } from 'src/user';
import { RegisterInput } from './register.input';

@InputType({ description: 'Input type for creating a new user, extending the register input with user roles.' })
export class CreateUserInput extends RegisterInput {
  @Field(() => UserRole, { description: 'The role assigned to the new user.' })
  @IsEnum(UserRole)
  @IsIn([UserRole.customer, UserRole.manager])
  role: UserRole;
}
