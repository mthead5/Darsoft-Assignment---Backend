import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { User } from '../users/user.schema';

@Schema({
  timestamps: true,
})
export class NewsPost {
  @ApiProperty({ description: 'The title of the news post', type: 'String' })
  @Prop()
  title: string;

  @ApiProperty({
    description: 'The description of the news post',
    type: 'String',
  })
  @Prop()
  description: string;

  @ApiProperty({
    description: 'A reference to the owner of the news post',
    type: 'User',
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  owner: User;
}

export const NewsPostSchema = SchemaFactory.createForClass(NewsPost);
