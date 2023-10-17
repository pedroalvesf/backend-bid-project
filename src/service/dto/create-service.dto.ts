import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min, MinLength } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    description: "The title of the service requested is required.",
    example: "Service request Title"
  })
  @IsNotEmpty()
  @MinLength(5)
  title: string;

  @ApiProperty({
    description: "The description of the service requested is required.",
    example: "The service is related to developer of a new system"
  })
  @IsNotEmpty()
  @MinLength(20)
  description: string;

  @ApiProperty({
    description: "The price of the service requested is required.",
    example: "The price of the service that the user want to pay"
  })
  @IsNotEmpty()
  @Min(20)
  priceRange: number;
  
  @ApiProperty({
    description: "The user that requested the service is NOT required on the Json.",
    example: "It goes directly, from the controller"
  })
  requestedById: number;

  @ApiProperty({
    description: "The status of the service, will start as 'OPEN', but if the user accept one bid, it will change to closed is NOT required.",
    example: "OPEN, CLOSED or CANCELED"
  })
  @Optional()
  serviceStatus: string;
}
