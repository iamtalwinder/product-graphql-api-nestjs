import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  public findAll() {
    return [{ id: 1, name: 'test', description: 'test' }];
  }
}
