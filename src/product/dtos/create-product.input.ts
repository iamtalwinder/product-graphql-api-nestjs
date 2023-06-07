import { InputType } from '@nestjs/graphql';
import { ProductInput } from './product.input';

@InputType()
export class CreateProductInput extends ProductInput {

}
