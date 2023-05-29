import { v4 as uuidv4 } from 'uuid';
import { BadRequestException, Injectable } from '@nestjs/common';
import { translationKeys, EncryptionService } from 'src/common';
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
    const userExists: boolean =
      await this.userService.doesUserWithEmailExist(email);

    if (userExists) {
      throw new BadRequestException(translationKeys.auth.emailAlreadyExists);
    }

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

    if (!user) {
      throw new BadRequestException(translationKeys.auth.invalidCredentials);
    }

    const isPasswordValid = await EncryptionService.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException(translationKeys.auth.invalidCredentials);
    }

    return this.tokenService.issueToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  }

  public async issueAnonymousToken(): Promise<AuthTokenOutput> {
    return this.tokenService.issueToken({
      id: uuidv4(),
      role: UserRole.anonymous,
    });
  }
}
