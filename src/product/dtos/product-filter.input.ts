import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { ProductInput } from './product.input';

@InputType()
export class ProductFilterInput extends PartialType(
  OmitType(ProductInput, ['images', 'tags'] as const),
) {
  
}