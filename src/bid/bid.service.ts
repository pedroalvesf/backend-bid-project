import { Injectable, NotFoundException } from '@nestjs/common';
import { Bid } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';

@Injectable()
export class BidService {
  constructor(private prisma: PrismaService) {}

  async create(createBidDto: CreateBidDto): Promise<Bid> {
    const serviceId = await this.prisma.service.findUnique({
      where: { id: createBidDto.serviceId },
    });

    if (!serviceId) {
      throw new NotFoundException(`Service with id ${createBidDto.serviceId} not found`);
    }

    const bid =  await this.prisma.bid.create({
      data: createBidDto,
    });

    return bid;
  }

  async findAll() {
    return this.prisma.bid.findMany({
      include: {
        createdBy: true,
        service: true,
      },
    });
  }
  async findAllByUser(id: number): Promise<Bid[] | null> {
    return await this.prisma.bid.findMany({
      where: { createdById: id },
      });
  }

  async findOne(id: number) {
    return this.prisma.bid.findUnique({
      where: { id },
      });
  }

  async update(id: number, updateBidDto: UpdateBidDto): Promise<Bid> {
    const bid = await this.prisma.bid.findUnique({
      where: { id },
    });
    if (!bid) {
      throw new NotFoundException(`Bid with id ${id} not found`);
    }

    return this.prisma.bid.update({
      where: { id },
      data: updateBidDto,
    });
  }

  remove(id: number) {
    return this.prisma.bid.delete({ where: { id } });
  }
}
