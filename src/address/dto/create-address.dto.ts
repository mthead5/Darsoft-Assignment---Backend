import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    maxLength: 255,
    minLength: 3,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @MinLength(3)
  name: string;

  @ApiProperty({
    maxLength: 255,
    minLength: 3,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @MinLength(3)
  city: string;

  @ApiProperty({
    maxLength: 255,
    minLength: 3,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @MinLength(3)
  street: string;

  @ApiProperty({
    maxLength: 255,
    minLength: 5,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @MinLength(5)
  location: string;
}
