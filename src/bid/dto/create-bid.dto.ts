import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { BidStatus } from "@prisma/client";
import { IsNotEmpty, MinLength } from "class-validator";

export class CreateBidDto {
  @ApiProperty({
    description: "The price to the provider do this service is required.",
    example: "The price of the service that the user want to receive"
  })
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: "The id of the service that the PROVIDER want to offer is required.",
    example: "1"
  })
  @IsNotEmpty()
  serviceId: number;

  createdById: number;

  @ApiProperty({
    description: "The message to the user that requested the service is required.",
    example: "I have a great experience in this segment of project..."
  })
  @IsNotEmpty()
  @MinLength(5)
  message: string;

  @ApiProperty({
    description: "The status of the bid, will start as 'OPEN', but if the user accept the bid, it will change to closed is NOT required.",
    example: "OPEN, ACCEPTED, REJECTED, CANCELED"
  })
  @Optional()
  bidStatus: BidStatus;
}
