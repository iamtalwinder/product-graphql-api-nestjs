import { Injectable } from '@nestjs/common';
import { EncryptionService } from 'src/common/encryption';
import { UserDocument, UserRole, UserService } from 'src/user';
import { AuthTokenOutput, LoginInput, RegisterInput } from '../dtos';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  async register(dto: RegisterInput): Promise<AuthTokenOutput> {
    const { email, password, firstName, lastName } = dto;

    const hashedPassword = await EncryptionService.hash(password);
    const user: UserDocument = await this.userService.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      role: UserRole.customer,
    });

    return this.tokenService.issueToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  }

  async login(dto: LoginInput): Promise<AuthTokenOutput> {
    const { email, password } = dto;

    const user = await this.userService.findOne({ email });
    if (user && (await EncryptionService.compare(password, user.password))) {
      return this.tokenService.issueToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
    }
    throw new Error('Invalid credentials');
  }
}
