import { InputType, PartialType } from '@nestjs/graphql';
import { ProductInput } from './product.input';

@InputType({ description: 'Input type for partially updating product details.' })
export class UpdateProductInput extends PartialType(ProductInput) {}
