import { Injectable } from '@nestjs/common';
import { Document, Model, UpdateWriteOpResult } from 'mongoose';
import { DeleteResult } from 'mongodb';
@Injectable()
export abstract class BaseService<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  public async find(filter = {}): Promise<T[]> {
    return this.model.find(filter).exec();
  }

  public async findOne(filter = {}): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  public async findOneById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  public async findOneAndUpdate(
    id: string,
    update: Partial<T>,
  ): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  public async create(dto: Partial<T>): Promise<T> {
    return this.model.create(dto);
  }

  public async update(
    filter = {},
    update: Partial<T>,
  ): Promise<UpdateWriteOpResult> {
    return this.model.updateMany(filter, update, { new: true }).exec();
  }

  public async deleteOne(filter = {}): Promise<DeleteResult> {
    return this.model.deleteOne(filter).exec();
  }

  public async deleteMany(filter = {}): Promise<DeleteResult> {
    return this.model.deleteMany(filter).exec();
  }
}
