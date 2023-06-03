import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from '../services';
import {
  AuthTokenOutput,
  CreateUserInput,
  CreateUserOutput,
  LoginInput,
  RegisterInput,
} from '../dtos';
import { User, UserRole } from 'src/user';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, Roles, RolesGuard } from 'src/common';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthTokenOutput)
  async register(
    @Args('registerInput') registerInput: RegisterInput,
  ): Promise<AuthTokenOutput> {
    return this.authService.register(registerInput);
  }

  @Mutation(() => AuthTokenOutput)
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<AuthTokenOutput> {
    return this.authService.login(loginInput);
  }

  @Mutation(() => AuthTokenOutput)
  async issueAnonymousToken(): Promise<AuthTokenOutput> {
    return this.authService.issueAnonymousToken();
  }

  @Mutation(() => CreateUserOutput)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.authService.createUser(createUserInput);
  }
}
