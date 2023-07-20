import { InputType, PartialType } from '@nestjs/graphql';
import { InventoryInput } from './inventory.input';

@InputType({ description: 'Input type for partially updating inventory details.' })
export class UpdateInventoryInput extends PartialType(InventoryInput) {}
