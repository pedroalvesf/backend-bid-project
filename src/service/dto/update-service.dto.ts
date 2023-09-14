import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  title?: string;
  description?: string;
  priceRange?: number;
  updatedAt?: Date;
}
