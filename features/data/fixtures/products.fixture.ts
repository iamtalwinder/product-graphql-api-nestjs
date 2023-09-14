import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { BaseFixture } from '@nestjs-cucumber-kit/core';
import { Product, ProductDocument } from 'src/product';

export default class ProductFixture extends BaseFixture {
  async apply(): Promise<void> {
    const productModel: Model<ProductDocument> = this.app.get(getModelToken(Product.name));

    const products: Product[] = [
      {
        _id: 'p1',
        name: 'Laptop Pro',
        sku: 'LP1001',
        description: 'High performance laptop',
        price: 1200.00,
        category: 'Electronics',
        images: ['image1.jpg', 'image2.jpg'],
        tags: ['electronics', 'laptop', 'tech'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: 'p2',
        name: 'Smartphone Max',
        sku: 'SM1001',
        description: 'Latest model smartphone',
        price: 800.00,
        category: 'Mobile Phones',
        images: ['image3.jpg', 'image4.jpg'],
        tags: ['mobile', 'smartphone', 'tech'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await productModel.insertMany(products);
  }
}
