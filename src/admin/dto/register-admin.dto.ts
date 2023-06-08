import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail, IsPhoneNumber, IsDateString, IsStrongPassword } from "class-validator";

export class RegisterAdminDto {
    @ApiProperty({ example: "admin1", description: "Adminning to'liq ismi" })
    @IsNotEmpty()
    @IsString()
    full_name: string;

    @ApiProperty({ example: "admin1@gmail.com", description: "Adminning emaili" })
    @IsEmail()
    email: string;

    @ApiProperty({ example: "+998901234567", description: "Adminning telefon raqami" })
    @IsPhoneNumber()
    phone_number: string;

    @ApiProperty({ example: "2000.08.10", description: "Adminning tug'ilgan kuni" })
    @IsDateString()
    birthdate: Date;

    @ApiProperty({ example: "Admin123!", description: "Adminning paroli" })
    @IsStrongPassword()
    password: string;
}
