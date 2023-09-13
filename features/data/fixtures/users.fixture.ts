import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { BaseFixture } from '@nestjs-cucumber-kit/core';
import { User, UserDocument, UserRole } from 'src/user';
import { EncryptionService } from 'src/common';

export default class UserFixture extends BaseFixture {
  async apply(): Promise<void> {
    const userModel: Model<UserDocument> = this.app.get(getModelToken(User.name));

    const hashedPassword = await EncryptionService.hash('ProductAPI@999');

    const users: User[] = [
      { 
        _id: '1', 
        email: 'anonymous@gmail.com',
        firstName: 'anonymous',
        lastName: 'anonymous',
        password: hashedPassword,
        role: UserRole.anonymous,
      },
      { 
        _id: '2', 
        email: 'customer@gmail.com',
        firstName: 'customer',
        lastName: 'customer',
        password: hashedPassword,
        role: UserRole.customer,
      },
      { 
        _id: '3', 
        email: 'admin@gmail.com',
        firstName: 'admin',
        lastName: 'admin',
        password: hashedPassword,
        role: UserRole.admin,
      },
      { 
        _id: '4', 
        email: 'manager@gmail.com',
        firstName: 'manager',
        lastName: 'manager',
        password: hashedPassword,
        role: UserRole.manager,
      },
    ];

    await userModel.insertMany(users);
  }
}
