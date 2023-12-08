import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    maxLength: 255,
    minLength: 3,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @MinLength(5)
  fullname: string;

  @ApiProperty({
    type: 'string',
    format: 'email',
  })
  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: 'email field must be a valid email',
    },
  )
  email: string;

  @ApiProperty({
    maxLength: 255,
    minLength: 8,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @MinLength(8)
  password: string;
}
