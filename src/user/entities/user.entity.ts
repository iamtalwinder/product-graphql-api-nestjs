import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Base } from 'src/common';
import { UserRole } from '../enums';

@ObjectType({ description: 'User entity representing a registered user.' })
@Schema({
  timestamps: true,
})
export class User extends Base {
  @Field({ description: 'The unique email address of the user.' })
  @Prop({ required: true, unique: true })
  email: string;

  @Field({ description: 'The first name of the user.' })
  @Prop({ required: true })
  firstName: string;

  @Field({ description: 'The last name of the user.' })
  @Prop({ required: true })
  lastName: string;

  // Note: Password is not exposed via GraphQL API
  @Prop({ required: true })
  password: string;

  @Field(() => UserRole, { description: 'The role of the user in the system.' })
  @Prop({ required: true, type: String, enum: UserRole })
  role: UserRole;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
