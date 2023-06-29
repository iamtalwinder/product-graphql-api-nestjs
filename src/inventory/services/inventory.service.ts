import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/common';
import { Inventory, InventoryDocument } from '../entities';
import { OrderItemInput, PlaceOrderInput } from 'src/order/dto';

@Injectable()
export class InventoryService extends BaseService<InventoryDocument> {
  constructor(@InjectModel(Inventory.name) inventoryModel: Model<InventoryDocument>) {
    super(inventoryModel);
  }

  public async isStockAvailable(order: PlaceOrderInput): Promise<boolean> {
    const productIds: string[] = PlaceOrderInput.getProductIds(order);
    const inventories: InventoryDocument[] = await this.find({ product: { $in: productIds }});
    
    return order.items.reduce((isStockAvailable: boolean, item: OrderItemInput) => {
      const inventory: InventoryDocument = inventories.find(
        (inventory: InventoryDocument) => inventory.product === item.productId,
      );
        
      return isStockAvailable && inventory.getTotalQuantity() >= item.quantity;
    }, true);
  }
  

}
