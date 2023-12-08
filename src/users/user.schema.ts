import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from './user-roles.enum';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @ApiProperty({
    description: 'The fullname of the user',
    type: 'String',
  })
  @Prop()
  fullname: string;

  @ApiProperty({
    description: 'The email of the user',
    type: 'Email',
  })
  @Prop({
    unique: true,
  })
  email: string;

  @Prop()
  password: string;

  @ApiProperty({
    description: 'The role of the user',
    type: 'enum',
    enum: Object.values(Role),
  })
  @Prop({
    type: String,
    enum: Object.values(Role),
  })
  role: string;

  @ApiProperty({
    description: 'The birthday of the user',
    type: 'Date',
  })
  @Prop({
    type: Date,
    required: false,
  })
  birthday: Date;

  @ApiProperty({
    description: 'The country of the user',
    type: String,
  })
  @Prop({
    required: false,
  })
  country: string;

  @ApiProperty({
    description: 'The gender of the user',
    type: 'enum',
    enum: ['male', 'female'],
  })
  @Prop({
    enum: ['male', 'female'],
    required: false,
  })
  gender: string;

  @ApiProperty({
    description: 'The phone number of the user',
    type: 'String',
  })
  @Prop({
    required: false,
  })
  phone_number: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
