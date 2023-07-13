import { v4 as uuidv4 } from 'uuid';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@ObjectType({ 
  isAbstract: true, 
  description: 'Base abstract class providing common fields for all entities.'
})
@Schema({
  timestamps: true,
})
export abstract class Base {
  @Field(() => ID, { 
    description: 'Unique identifier of the entity.' 
  }) 
  @Prop({ default: () => uuidv4() })
  _id: string;
}
