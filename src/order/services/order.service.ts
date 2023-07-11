import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService, TokenPayload, translationKeys } from 'src/common';
import { UserDocument, UserService } from 'src/user';
import { Order, OrderDocument, OrderItem } from '../entities';
import { ProductDocument, ProductService } from 'src/product';
import { InventoryService } from 'src/inventory';
import { OrderItemInput, PlaceOrderInput } from '../dto';
import { OrderStatus } from '../enums';

const USER_NOT_FOUND: string = translationKeys.user.notFound;
const PRODUCT_NOT_FOUND: string = translationKeys.product.notFound;
const OUT_OF_STOCK: string = translationKeys.product.outOfStock;
@Injectable()
export class OrderService extends BaseService<OrderDocument> {
  constructor(
    @InjectModel(Order.name) orderModel: Model<OrderDocument>,
    private userService: UserService,
    private productService: ProductService,
    private inventoryService: InventoryService,
  ) {
    super(orderModel);
  }

  public async placeOrder(placeOrderInput: PlaceOrderInput, userTokenPayload: TokenPayload): Promise<OrderDocument> {
    const user: UserDocument = await this.userService.findOneById(userTokenPayload.id);
    const productIds: string[] = PlaceOrderInput.getProductIds(placeOrderInput);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    const products: ProductDocument[] = await this.productService.findAllByIds(productIds);

    if (products?.length !== productIds.length) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }

    const isInStock: boolean = await this.inventoryService.isStockAvailable(placeOrderInput);

    if (!isInStock) {
      throw new BadRequestException(OUT_OF_STOCK);
    }

    const order: Partial<Order>= this.prepareOrder(placeOrderInput, products, user);
    await this.inventoryService.subtractInventory(placeOrderInput);
    return this.create(order);
  }

  private prepareOrder(placeOrderInput: PlaceOrderInput, products: ProductDocument[], user: UserDocument): Partial<Order> {
    const orderItems: OrderItem[] = placeOrderInput.items.map((orderItem: OrderItemInput) => {
      const product = products.find((product: ProductDocument) => product._id === orderItem.productId);

      return {
        product: product._id,
        quantity: orderItem.quantity,
        price: product.price,
      }
    });

    return {
      products: orderItems,
      shippingAddress: placeOrderInput.shippingAddress,
      status: OrderStatus.Pending,
      user: user._id,
    }
  }
}
