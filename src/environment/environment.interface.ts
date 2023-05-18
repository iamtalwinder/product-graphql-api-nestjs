import { JwtOptionsInterface } from 'src/auth';

export interface EnvironmentInterface {
  port: number;
  mongodb: string;
  jwtOptions: JwtOptionsInterface;
}
