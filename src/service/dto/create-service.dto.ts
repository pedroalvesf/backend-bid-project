import { Optional } from '@nestjs/common';
import { IsNotEmpty, Min, MinLength } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  @MinLength(5)
  title: string;

  @IsNotEmpty()
  @MinLength(20)
  description: string;

  @IsNotEmpty()
  @Min(20)
  priceRange: number;

  requestedById: number;

  @Optional()
  serviceStatus: string;
}
