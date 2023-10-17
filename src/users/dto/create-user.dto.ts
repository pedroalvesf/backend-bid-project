import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength
} from 'class-validator';

export class CreateUserDto {

  @ApiProperty({
    description: 'Email, which is the login is required.',
    example: 'example@gmail.com'
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @ApiProperty({
    description: 'User password is required.',
    example: '12345678'
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: "As default will be USER, however, to receive all authorization use 'ADMIN' is NOT required.",
    example: "ADMIN"
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
