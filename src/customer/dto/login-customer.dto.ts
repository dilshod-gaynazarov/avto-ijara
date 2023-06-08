import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

export class LoginCustomerDto {
    @ApiProperty({ example: "eshmat@gmail.com", description: "Mijoz emaili" })
    @IsEmail()
    email: string;

    @ApiProperty({ example: "Eshmat123!", description: "Mijoz paroli" })
    @IsStrongPassword()
    password: string;
}