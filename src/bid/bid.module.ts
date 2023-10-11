import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BidController } from './bid.controller';
import { BidService } from './bid.service';

@Module({
  controllers: [BidController],
  providers: [BidService, PrismaService],
})
export class BidModule {}
