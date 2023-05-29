import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  customer = 'customer',
  admin = 'admin',
  manager = 'manager',
  anonymous = 'anonymous',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
