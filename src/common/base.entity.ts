import { v4 as uuidv4 } from 'uuid';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@ObjectType({ isAbstract: true })
@Schema()
export abstract class Base {
  @Field(() => ID)
  @Prop({ default: () => uuidv4() })
  id: string;
}
