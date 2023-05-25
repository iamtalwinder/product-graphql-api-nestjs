import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './resolvers';
import { AuthService, TokenService } from './services';
import environment from 'src/environment';
import { UserModule } from 'src/user';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: environment.jwtOptions.secret,
    }),
    UserModule,
  ],
  providers: [AuthResolver, AuthService, TokenService],
})
export class AuthModule {}
