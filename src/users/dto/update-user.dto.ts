import { UserRole } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  Length,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @Length(3, 15)
  username: string;

  @IsOptional()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @MinLength(3)
  name?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
