import { InputType, PartialType } from '@nestjs/graphql';
import { InventoryInput } from './inventory.input';

@InputType()
export class UpdateInventoryInput extends PartialType(InventoryInput) {}
