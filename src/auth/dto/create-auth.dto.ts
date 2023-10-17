import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateAuthDto {

    @ApiProperty({
      description: 'Email, which is the login is required, same as the user.',
      example: 'example@gmail.com'
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
      description: 'User password is required, same as the user.',
      example: '12345678'
    })
    @IsNotEmpty()
    @MinLength(6)
    @IsNotEmpty()
    password: string;
}