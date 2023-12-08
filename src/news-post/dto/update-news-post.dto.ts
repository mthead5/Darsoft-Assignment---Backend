import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateNewsPostDto {
  @ApiProperty({
    maxLength: 255,
    minLength: 3,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @MinLength(3)
  title: string;

  @ApiProperty({
    maxLength: 2000,
    minLength: 5,
  })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  @MinLength(5)
  description: string;
}
