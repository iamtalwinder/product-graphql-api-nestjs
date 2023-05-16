import * as dotenv from 'dotenv';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvironmentDto } from './environment.dto';
import { EnvironmentInterface } from './environment.interface';

dotenv.config();
const env: NodeJS.ProcessEnv = process.env;

function validateEnvironment(plainEnv: EnvironmentInterface): EnvironmentDto {
  const envDto = plainToInstance(EnvironmentDto, plainEnv);

  const errors = validateSync(envDto);
  if (errors.length > 0) {
    throw new Error(`Configuration validation error: ${errors}`);
  }

  return envDto;
}

const environment: EnvironmentInterface = {
  port: parseInt(env.APP_PORT),
  mongodb: env.MONGODB_URL,
  jwtOptions: {
    secret: env.JWT_SECRET,
    accessTokenExp: env.JWT_ACCESS_TOKEN_EXPIRATION,
    refreshTokenExp: env.JWT_REFRESH_TOKEN_EXPIRATION,
  },
};

export default validateEnvironment(environment);
