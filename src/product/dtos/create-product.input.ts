import { InputType } from '@nestjs/graphql';
import { ProductInput } from './product.input';

@InputType({ description: 'Input type for creating a new product.' })
export class CreateProductInput extends ProductInput {}
