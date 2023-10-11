import { IsNotEmpty, MinLength } from "class-validator";

export class CreateBidDto {
  @IsNotEmpty()
  @MinLength(20)
  price: number;

  serviceId: number;

  createdById: number;

  @IsNotEmpty()
  @MinLength(5)
  message: string;

}
