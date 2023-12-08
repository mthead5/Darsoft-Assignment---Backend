import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { User } from '../users/user.schema';

@Schema({
  timestamps: true,
})
export class Address {
  @ApiProperty({ description: 'The name of the address' })
  @Prop()
  name: string;

  @ApiProperty({ description: 'The city' })
  @Prop()
  city: string;

  @ApiProperty({ description: 'The street' })
  @Prop()
  street: string;

  @ApiProperty({ description: 'The location' })
  @Prop()
  location: string;

  @ApiProperty({
    description: 'A reference to the owner of the record',
    type: 'User',
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  owner: User;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
