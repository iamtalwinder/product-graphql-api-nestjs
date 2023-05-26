import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import environment from 'src/environment';
import { JwtOptionsInterface, TokenPayload } from '../interfaces';

const jwtOptions: JwtOptionsInterface = environment.jwtOptions;

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async issueToken(
    payload: TokenPayload,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: jwtOptions.accessTokenExp,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: jwtOptions.refreshTokenExp,
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.sign(payload, {
      expiresIn: jwtOptions.refreshTokenExp,
    });
  }
}
