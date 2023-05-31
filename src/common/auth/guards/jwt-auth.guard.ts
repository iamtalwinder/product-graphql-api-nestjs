import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { translationKeys } from 'src/common';

const INVALID_TOKEN: string = translationKeys.auth.invalidToken;

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    const authHeader = request.headers.authorization;
    if (!authHeader) throw new UnauthorizedException(INVALID_TOKEN);

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException(INVALID_TOKEN);
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException(INVALID_TOKEN);
    }
  }
}
