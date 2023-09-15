import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';
import { Min, MinLength } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @Optional()
  @MinLength(5)
  title: string;

  @Optional()
  @MinLength(20)
  description: string;

  @Optional()
  @Min(20)
  priceRange: number;
}
