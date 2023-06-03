import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { IsEnum, IsIn } from 'class-validator';
import { User, UserRole } from 'src/user';

@ObjectType()
export class CreateUserOutput extends OmitType(User, ['password'] as const) {
  @Field(() => UserRole)
  @IsEnum(UserRole)
  @IsIn([UserRole.customer, UserRole.manager])
  role: UserRole;
}
