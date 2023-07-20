import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { IsEnum, IsIn } from 'class-validator';
import { User, UserRole } from 'src/user';

@ObjectType({ description: 'Output type for creating a new user, omitting sensitive information like password.' })
export class CreateUserOutput extends OmitType(User, ['password'] as const) {
  @Field(() => UserRole, { description: 'The role assigned to the created user.' })
  @IsEnum(UserRole)
  @IsIn([UserRole.customer, UserRole.manager])
  role: UserRole;
}
