import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../interfaces';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async issueToken(
    payload: TokenPayload,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.sign(payload, {
      expiresIn: '15m',
    });
  }
}
