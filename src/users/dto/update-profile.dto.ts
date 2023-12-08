import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserProfileDto {
  @ApiProperty({
    maxLength: 255,
    minLength: 3,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @MinLength(5)
  fullname: string;

  @ApiProperty({
    type: 'string',
    format: 'email',
  })
  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'email field must be a valid email',
    },
  )
  email: string;

  @ApiProperty({
    maxLength: 255,
    minLength: 3,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @MinLength(3)
  country: string;

  @ApiProperty({
    type: Date,
  })
  @IsOptional()
  @IsDateString()
  birthday: Date;

  @ApiProperty({
    type: 'enum',
    enum: ['male', 'female'],
  })
  @IsOptional()
  @IsEnum(['male', 'female'])
  gender: string;

  @ApiProperty({
    type: String,
    format: /\+[0-9]+/g,
    example: '+963999999999',
  })
  @IsOptional()
  @IsString()
  phone_number: string;
}
