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

  @Mutation(() => Order)
  @Roles(UserRole.admin, UserRole.manager, UserRole.customer)
  async placeOrder(@Args('placeOrderInput') placeOrderInput: PlaceOrderInput, @Context() context) {
    const req: AuthenticatedRequest = context.req;
    return this.orderService.placeOrder(placeOrderInput, req.user);
  }

  @Mutation(() => GetOrdersOutput)
  @Roles(UserRole.admin, UserRole.manager, UserRole.customer)
  async getUserOrders(
    @Context() context,
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page?: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 20 }) limit?: number,
  ) {
    const req: AuthenticatedRequest = context.req;
    return this.orderService.findAllWithFilterAndCount({ user: req.user.id }, page, limit);
  }

  @Mutation(() => GetOrdersOutput)
  @Roles(UserRole.admin, UserRole.manager)
  async getAllOrders(
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page?: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 20 }) limit?: number,
  ) {
    return this.orderService.findAllWithFilterAndCount({}, page, limit);
  }

  @ResolveField('product', () => Product)
  async getProduct(@Parent() orderItem: OrderItem): Promise<Product> {
    return this.productService.findOneById(orderItem.product as string);
  }

  @ResolveField('user', () => User)
  async getUser(@Parent() order: Order): Promise<User> {
    return this.userService.findOneById(order.user as string);
  }
}
