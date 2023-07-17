import { InputType } from '@nestjs/graphql';
import { InventoryInput } from './inventory.input';

@InputType()
export class CreateInventoryInput extends InventoryInput {}
