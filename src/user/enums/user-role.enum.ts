import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  customer = 'customer',
  admin = 'admin',
  manager = 'manager',
  anonymous = 'anonymous',
}

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'Defines the role of a user within the system and their respective permissions.',
  valuesMap: {
    customer: {
      description: 'A customer who can view and purchase products and view their orders.', 
    },
    admin: {
      description: 'An administrator with full privileges, including managing users and roles.', 
    },
    manager: {
      description: 'A manager with administrative capabilities, except for creating or managing admins or other managers.', 
    },
    anonymous: {
      description: 'An anonymous user who can only view products but cannot make purchases.', 
    },
  },
});
