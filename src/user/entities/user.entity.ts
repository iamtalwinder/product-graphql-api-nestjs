import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Base } from 'src/common';
import { UserRole } from '../enums';

@ObjectType()
@Schema({
  timestamps: true,
})
export class User extends Base {
  @Field()
  @Prop({ required: true, unique: true })
  email: string;

  @Field()
  @Prop({ required: true })
  firstName: string;

  @Field()
  @Prop({ required: true, unique: true })
  lastName: string;

  @Prop({ required: true })
  password: string;

  @Field(() => UserRole)
  @Prop({ required: true, type: String, enum: UserRole })
  role: UserRole;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
