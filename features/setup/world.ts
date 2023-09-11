import { AbstractWorld } from '@nestjs-cucumber-kit/core';
import { config } from './config';
import { AppModule } from '../../src/app.module';

export class CustomWorld extends AbstractWorld {
  constructor() {
    super(AppModule, config);
  }
}
