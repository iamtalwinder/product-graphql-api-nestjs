import { InputType, PartialType } from '@nestjs/graphql';
import { ProductInput } from './product.input';

@InputType()
export class UpdateProductInput extends PartialType(ProductInput) {}
