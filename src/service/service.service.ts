import { Injectable, NotFoundException } from '@nestjs/common';
import { Service } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    return this.prisma.service.create({
      data: createServiceDto,
    });
  }

  async findAll(): Promise<Service[]> {
    return this.prisma.service.findMany();
  }

  async findOne(id: number): Promise<Service | null> {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: {
        requestedBy: true,
      },
    });

    if (!service) {
      throw new Error(`Service with id ${id} not found`);
    }

    return service;
  }

  async update(
    id: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    const service = await this.findOne(id);

    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }

    return this.prisma.service.update({
      where: { id },
      data: updateServiceDto,
    });
  }

  async remove(id: number): Promise<Service> {
    const service = await this.findOne(id);

    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }

    return this.prisma.service.delete({
      where: { id },
    });
  }
}
