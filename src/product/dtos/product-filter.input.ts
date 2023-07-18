import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { ProductInput } from './product.input';

@InputType({
  description:
    'Input type for filtering products. Allows partial specification of product fields, excluding images and tags.',
})
export class ProductFilterInput extends PartialType(OmitType(ProductInput, ['images', 'tags'] as const)) {}
