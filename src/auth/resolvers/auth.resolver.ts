import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, Roles, RolesGuard } from 'src/common';
import { User, UserRole } from 'src/user';
import { AuthService } from '../services';
import { AuthTokenOutput, CreateUserInput, CreateUserOutput, LoginInput, RegisterInput } from '../dtos';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthTokenOutput, { description: 'Register a new user and return authentication tokens.' })
  async register(@Args('registerInput', { description: 'Input data for user registration.' }) registerInput: RegisterInput): Promise<AuthTokenOutput> {
    return this.authService.register(registerInput);
  }

  @Mutation(() => AuthTokenOutput, { description: 'Authenticate a user and return authentication tokens.' })
  async login(@Args('loginInput', { description: 'Input data for user login.' }) loginInput: LoginInput): Promise<AuthTokenOutput> {
    return this.authService.login(loginInput);
  }

  @Mutation(() => AuthTokenOutput, { description: 'Issue an anonymous authentication token for non-registered users.' })
  async issueAnonymousToken(): Promise<AuthTokenOutput> {
    return this.authService.issueAnonymousToken();
  }

  @Mutation(() => CreateUserOutput, { description: 'Create a new user. Restricted to admin users.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  async createUser(@Args('createUserInput', { description: 'Input data for creating a new user.' }) createUserInput: CreateUserInput): Promise<User> {
    return this.authService.createUser(createUserInput);
  }
}
