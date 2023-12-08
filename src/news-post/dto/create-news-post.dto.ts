import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateNewsPostDto {
  @ApiProperty({
    maxLength: 255,
    minLength: 3,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @MinLength(3)
  title: string;

  @ApiProperty({
    maxLength: 2000,
    minLength: 5,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(2000)
  @MinLength(5)
  description: string;
}
