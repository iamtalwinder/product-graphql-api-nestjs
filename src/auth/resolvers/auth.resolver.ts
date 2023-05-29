import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from '../services';
import { AuthTokenOutput, LoginInput, RegisterInput } from '../dtos';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthTokenOutput)
  async register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  @Mutation(() => AuthTokenOutput)
  async login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Mutation(() => AuthTokenOutput)
  async issueAnonymousToken(): Promise<AuthTokenOutput> {
    return this.authService.issueAnonymousToken();
  }
}
