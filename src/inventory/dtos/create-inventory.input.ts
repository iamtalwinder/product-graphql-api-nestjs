import { InputType } from '@nestjs/graphql';
import { InventoryInput } from './inventory.input';

@InputType({ description: 'Input type for creating a new inventory record.' })
export class CreateInventoryInput extends InventoryInput {}
