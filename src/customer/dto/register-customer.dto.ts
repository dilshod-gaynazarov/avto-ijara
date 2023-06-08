import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class RegisterCustomerDto {
    @ApiProperty({example: "Eshmat Toshmatov Quvondiq o'g'li", description: "Mijoz ismi"})
    @IsNotEmpty()
    @IsString()
    full_name: string;

    @ApiProperty({example: "+998901234567", description: "Mijoz telefon raqami"})
    @IsPhoneNumber()
    phone_number: string;

    @ApiProperty({example: "eshmat@gmail.com", description: "Mijoz emaili"})
    @IsEmail()
    email: string;

    @ApiProperty({example: "Eshmat123!", description: "Mijoz paroli"})
    @IsStrongPassword()
    password: string;

    @ApiProperty({example: "Yugnakiy 46", description: "Mijoz manzili"})
    @IsNotEmpty()
    @IsString()
    address: string;
}
