import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/common';
import { OrderItemInput, PlaceOrderInput } from 'src/order';
import { Inventory, InventoryDocument } from '../entities';

@Injectable()
export class InventoryService extends BaseService<InventoryDocument> {
  constructor(@InjectModel(Inventory.name) inventoryModel: Model<InventoryDocument>) {
    super(inventoryModel);
  }

  public async isStockAvailable(order: PlaceOrderInput): Promise<boolean> {
    const productIds: string[] = PlaceOrderInput.getProductIds(order);
    const inventories: InventoryDocument[] = await this.find({ product: { $in: productIds } });

    return order.items.reduce((isStockAvailable: boolean, item: OrderItemInput) => {
      const inventory: InventoryDocument = inventories.find(
        (inventory: InventoryDocument) => inventory.product === item.productId,
      );

      return isStockAvailable && inventory.getTotalQuantity() >= item.quantity;
    }, true);
  }

  public async subtractInventory(order: PlaceOrderInput): Promise<InventoryDocument[]> {
    const productIds: string[] = PlaceOrderInput.getProductIds(order);
    const inventories: InventoryDocument[] = await this.find({ product: { $in: productIds } });

    const tasks: Array<Promise<InventoryDocument>> = order.items.map((orderItem: OrderItemInput) => {
      const inventory: InventoryDocument = inventories.find(
        (inventory: InventoryDocument) => inventory.product === orderItem.productId,
      );

      let remainingQuantity = orderItem.quantity;

      if (inventory) {
        for (const location of inventory.inventoryLocations) {
          if (remainingQuantity <= 0) break;

          const available = location.quantity;
          const toSubtract = Math.min(remainingQuantity, available);
          location.quantity -= toSubtract;
          remainingQuantity -= toSubtract;
        }
      }

      return inventory.save();
    });

    return Promise.all(tasks);
  }
}
