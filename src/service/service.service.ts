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
      throw new NotFoundException(`Service with id ${id} not found`);
    }

    return service;
  }

  async update(
    id: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }

    return this.prisma.service.update({
      where: { id },
      data: updateServiceDto,
    });
  }

  async bidAcceptance(
    idBid: number,
    idService: number
  ) {

    const service = await this.prisma.service.findUnique({
      where: { id: idService },
    });

    if (!service) {
      throw new NotFoundException(`Service with id ${idService} not found`);
    }

    const bid = await this.prisma.bid.findUnique({
      where: { id: idBid },
    });

    if (!bid) {
      throw new NotFoundException(`Bid with id ${idBid} not found`);
    }
    
    await this.prisma.service.update({
      where: { id: idService },
      data: {
        status: "CLOSED"
      },
    });
    await this.prisma.bid.update({
      where: { id: idBid },
      data: {
        bidStatus: "ACCEPTED"
      },
    });

    return {
      message: "Bid accepted"
    };
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

  async cancelServiceRequest(id: number): Promise<Service> {
    const service = await this.findOne(id);

    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }

    return this.prisma.service.update({
      where: { id },
      data: {
        status: "CANCELED"
      },
    });
  }
}
