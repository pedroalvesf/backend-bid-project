import { IsNumber, MinLength } from 'class-validator';

export class CreatePersonDto {
  @MinLength(2)
  name: string;
  @MinLength(14)
  cpf: string;
  @MinLength(2)
  rg: string;
  @MinLength(4)
  birthday: Date;
  @MinLength(11)
  phone: string;
  @IsNumber()
  userId: number;
}
