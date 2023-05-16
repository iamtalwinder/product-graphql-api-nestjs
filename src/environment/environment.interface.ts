import { JwtOptionsInterface } from 'src/auth/interfaces';

export interface EnvironmentInterface {
  port: number;
  mongodb: string;
  jwtOptions: JwtOptionsInterface;
}
