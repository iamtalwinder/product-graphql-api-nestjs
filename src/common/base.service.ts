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

  public async findAllByIds(ids: string[]): Promise<T[] | null> {
    return this.model.find({ _id: { $in: ids } }).exec();
  }

  public async findOneAndUpdate(id: string, update: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  async findAllWithFilterAndCount(
    filter = {},
    page?: number,
    limit?: number,
  ): Promise<{ documents: T[]; totalCount: number }> {
    const query = this.model.find();

    Object.keys(filter).forEach((key) => {
      if (filter[key] !== undefined) {
        query.where(key).equals(filter[key]);
      }
    });

    const totalCount = await this.model.countDocuments(filter).exec();

    if (page !== undefined && limit !== undefined) {
      query.skip((page - 1) * limit).limit(limit);
    }

    const documents = await query.exec();
    return { documents, totalCount };
  }

  public async create(dto: Partial<T>): Promise<T> {
    return this.model.create(dto);
  }

  public async update(filter = {}, update: Partial<T>): Promise<UpdateWriteOpResult> {
    return this.model.updateMany(filter, update, { new: true }).exec();
  }

  public async deleteOne(filter = {}): Promise<DeleteResult> {
    return this.model.deleteOne(filter).exec();
  }

  public async deleteById(id: string): Promise<DeleteResult> {
    return this.model.deleteOne({ _id: id }).exec();
  }

  public async deleteMany(filter = {}): Promise<DeleteResult> {
    return this.model.deleteMany(filter).exec();
  }
}
