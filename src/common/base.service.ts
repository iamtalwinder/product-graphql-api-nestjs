import { Injectable } from '@nestjs/common';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { DeleteResult } from 'mongodb';
import { Base } from './base.entity';

@Injectable()
export abstract class BaseService<T extends Base> {
  constructor(protected readonly model: Model<T>) {}

  async find(filter = {}): Promise<T[]> {
    return this.model.find(filter).exec();
  }

  async findOne(filter = {}): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async findOneById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findOneAndUpdate(id: string, update: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  async create(dto: Partial<T>): Promise<T> {
    return this.model.create(dto);
  }

  async update(filter = {}, update: Partial<T>): Promise<UpdateWriteOpResult> {
    return this.model.updateMany(filter, update, { new: true }).exec();
  }

  async deleteOne(filter = {}): Promise<DeleteResult> {
    return this.model.deleteOne(filter).exec();
  }

  async deleteMany(filter = {}): Promise<DeleteResult> {
    return this.model.deleteMany(filter).exec();
  }
}
