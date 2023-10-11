import { UserRole } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength
} from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @MinLength(3)
  name?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
