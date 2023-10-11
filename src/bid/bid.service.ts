import { Injectable } from '@nestjs/common';
import { Bid } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';

@Injectable()
export class BidService {
  constructor(private prisma: PrismaService) {}

  async create(createBidDto: CreateBidDto): Promise<Bid> {

    const createdById = await this.prisma.user.findUnique({
      where: { id: createBidDto.createdById },
    });

    if (!createdById) {
      throw new Error(`User with id ${createBidDto.createdById} not found`);
    }

    const serviceId = await this.prisma.service.findUnique({
      where: { id: createBidDto.serviceId },
    });

    if (!serviceId) {
      throw new Error(`Service with id ${createBidDto.serviceId} not found`);
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

  update(id: number, updateBidDto: UpdateBidDto) {
    return `This action updates a #${id} bid`;
  }

  remove(id: number) {
    return this.prisma.bid.delete({ where: { id } });
  }
}
