import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { BaseFixture } from '@nestjs-cucumber-kit/core';
import { Inventory, InventoryDocument } from 'src/inventory';

export default class InventoryFixture extends BaseFixture {
  async apply(): Promise<void> {
    const inventoryModel: Model<InventoryDocument> = this.app.get(getModelToken(Inventory.name));

    const inventories: Inventory[] = [
      {
        _id: 'inv1',
        product: 'p1',
        inventoryLocations: [
          {
            locationName: 'Warehouse A',
            warehouseAddress: '1234 Main St',
            quantity: 100,
            manager: 'Manager A',
            notes: 'Primary warehouse'
          },
          {
            locationName: 'Warehouse B',
            warehouseAddress: '5678 Second St',
            quantity: 50,
            manager: 'Manager B',
            notes: 'Secondary storage'
          }
        ]
      },
      {
        _id: 'inv2',
        product: 'p2',
        inventoryLocations: [
          {
            locationName: 'Warehouse C',
            warehouseAddress: '9012 Third St',
            quantity: 200,
            manager: 'Manager C',
            notes: 'Overseas warehouse'
          }
        ]
      }
    ];

    await inventoryModel.insertMany(inventories);
  }
}
