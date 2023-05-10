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
  port: parseInt(env.PORT),
  mongodb: env.MONGODB_URL,
};

export default validateEnvironment(environment);
