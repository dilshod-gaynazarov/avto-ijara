import { ApiProperty } from "@nestjs/swagger";

export class UpdateAdminDto {
    @ApiProperty({ example: "admin2", description: "Adminning yangi to'liq ismin" })
    full_name?: string;

    @ApiProperty({ example: "admin2@gmail.com", description: "Adminning yangi emaili" })
    email?: string;

    @ApiProperty({ example: "+998909876543", description: "Adminning yangi telefon raqami" })
    phone_number?: string;

    @ApiProperty({ example: "2000.08.10", description: "Adminning yangi tug'ilgan kuni" })
    birthdate?: Date;

    @ApiProperty({ example: "Admin123!", description: "Adminning yangi paroli" })
    password?: string;
}
