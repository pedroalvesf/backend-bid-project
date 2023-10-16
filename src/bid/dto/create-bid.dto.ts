import { Optional } from "@nestjs/common";
import { BidStatus } from "@prisma/client";
import { IsNotEmpty, MinLength } from "class-validator";

export class CreateBidDto {
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  serviceId: number;

  createdById: number;

  @IsNotEmpty()
  @MinLength(5)
  message: string;

  @Optional()
  bidStatus: BidStatus;
}
