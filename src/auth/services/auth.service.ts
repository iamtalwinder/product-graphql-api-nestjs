import { v4 as uuidv4 } from 'uuid';
import { BadRequestException, Injectable } from '@nestjs/common';
import { translationKeys, EncryptionService } from 'src/common';
import { User, UserDocument, UserRole, UserService } from 'src/user';
import {
  AuthTokenOutput,
  CreateUserInput,
  LoginInput,
  RegisterInput,
} from '../dtos';
import { TokenService } from './token.service';

const EMAIL_ALREADY_EXISTS: string = translationKeys.auth.emailAlreadyExists;
const INVALID_CREDENTIALS: string = translationKeys.auth.invalidCredentials;

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
      throw new BadRequestException(EMAIL_ALREADY_EXISTS);
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
      throw new BadRequestException(INVALID_CREDENTIALS);
    }

    const isPasswordValid = await EncryptionService.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException(INVALID_CREDENTIALS);
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

  public async createUser(dto: CreateUserInput): Promise<User> {
    const userExists: boolean = await this.userService.doesUserWithEmailExist(
      dto.email,
    );

    if (userExists) {
      throw new BadRequestException(EMAIL_ALREADY_EXISTS);
    }

    const hashedPassword = await EncryptionService.hash(dto.password);

    const user: UserDocument = await this.userService.create({
      ...dto,
      password: hashedPassword,
    });

    return user.toObject();
  }
}
