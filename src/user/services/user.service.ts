import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common';
import { UserDocument } from '../entities';

@Injectable()
export class UserService extends BaseService<UserDocument> {}
