import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common';
import { User, UserDocument } from '../entities';

@Injectable()
export class UserService extends BaseService<UserDocument> {
  constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
    super(userModel);
  }

  public async doesUserWithEmailExist(email: string): Promise<boolean> {
    const user: UserDocument = await this.findOne({ email });

    return !!user;
  }
}
