import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/common';
import { Inventory, InventoryDocument } from '../entities';

@Injectable()
export class InventoryService extends BaseService<InventoryDocument> {
  constructor(@InjectModel(Inventory.name) inventoryModel: Model<InventoryDocument>) {
    super(inventoryModel);
  }
  
}
