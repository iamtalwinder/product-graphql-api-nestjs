import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  customer = 'customer',
  admin = 'admin',
  manager = 'manager',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
