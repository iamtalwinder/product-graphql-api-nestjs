import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { JwtOptionsInterface } from 'src/auth';
import { EnvironmentInterface } from './environment.interface';

class JwtOptionsDto implements JwtOptionsInterface {
  @IsString()
  public secret: string;

  @IsString()
  public accessTokenExp: string;

  @IsString()
  public refreshTokenExp: string;
}

export class EnvironmentDto implements EnvironmentInterface {
  @IsNumber()
  public port: number;

  @IsString()
  public mongodb: string;

  @ValidateNested()
  @Type(() => JwtOptionsDto)
  public jwtOptions: JwtOptionsDto;
}
