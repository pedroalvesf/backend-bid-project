import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, MinLength } from 'class-validator';

export class CreatePersonDto {
  @ApiProperty({
    description: "The name of the user is required.",
    example: "First and Second"
  })
  @MinLength(2)
  name: string;

  @ApiProperty({
    description: "The cpf of the user is required.",
    example: "111.111.111-12"
  })
  @MinLength(14)
  cpf: string;

  @ApiProperty({
    description: "The rg of the user is required.",
    example: "888"
  })
  @MinLength(2)
  rg: string;

  @ApiProperty({
    description: "The birthday of the user is NOT required",
    example: "2023-10-10T15:22:25.129Z"
  })
  @Optional()
  @MinLength(4)
  birthday: Date;

  @ApiProperty({
    description: "The phone of the user is NOT required.",
    example: "999999999999"
  })
  @MinLength(11)
  phone: string;

  @ApiProperty({
    description: "The id of the user to relate the person and the user is required.",
    example: "1"
  })
  @IsNumber()
  userId: number;
}
