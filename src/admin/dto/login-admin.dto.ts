import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

export class LoginAdminDto {
    @ApiProperty({ example: "admin1@gmail.com", description: "Adminning emaili" })
    @IsEmail()
    email: string;

    @ApiProperty({ example: "Admin123!", description: "Adminning paroli" })
    @IsStrongPassword()
    password: string;
}
