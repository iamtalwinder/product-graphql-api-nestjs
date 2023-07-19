import { Resolver, Mutation, Args, ResolveField, Parent, Context, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthenticatedRequest, JwtAuthGuard, Roles, RolesGuard } from 'src/common';
import { Product, ProductService } from 'src/product';
import { User, UserRole, UserService } from 'src/user';
import { OrderService } from '../services';
import { Order, OrderItem } from '../entities';
import { GetOrdersOutput, PlaceOrderInput } from '../dto';

@Resolver(() => Order)
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Order, { description: 'Place a new order with the given details.' })
  @Roles(UserRole.admin, UserRole.manager, UserRole.customer)
  async placeOrder(
    @Args('placeOrderInput', { description: 'Input data for placing a new order.' }) placeOrderInput: PlaceOrderInput,
    @Context() context,
  ) {
    const req: AuthenticatedRequest = context.req;
    return this.orderService.placeOrder(placeOrderInput, req.user);
  }

  @Mutation(() => GetOrdersOutput, { description: 'Get orders placed by the currently authenticated user.' })
  @Roles(UserRole.admin, UserRole.manager, UserRole.customer)
  async getUserOrders(
    @Context() context,
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1, description: 'Page number for pagination.' })
    page?: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 20, description: 'Number of orders per page.' })
    limit?: number,
  ) {
    const req: AuthenticatedRequest = context.req;
    return this.orderService.findAllWithFilterAndCount({ user: req.user.id }, page, limit);
  }

  @Mutation(() => GetOrdersOutput, { description: 'Get all orders in the system. Restricted to admins and managers.' })
  @Roles(UserRole.admin, UserRole.manager)
  async getAllOrders(
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1, description: 'Page number for pagination.' })
    page?: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 20, description: 'Number of orders per page.' })
    limit?: number,
  ) {
    return this.orderService.findAllWithFilterAndCount({}, page, limit);
  }

  @ResolveField('product', () => Product, { description: 'Resolve the product details for an order item.' })
  async getProduct(@Parent() orderItem: OrderItem): Promise<Product> {
    return this.productService.findOneById(orderItem.product as string);
  }

  @ResolveField('user', () => User, { description: 'Resolve the user details for an order.' })
  async getUser(@Parent() order: Order): Promise<User> {
    return this.userService.findOneById(order.user as string);
  }
}
