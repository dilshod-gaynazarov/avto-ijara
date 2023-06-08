import { ApiProperty } from "@nestjs/swagger";

export class UpdateCustomerDto{
    @ApiProperty({example: "Doston Akmalov Sherzod o'g'li", description: "Mijozning yangi ismi"})
    full_name?: string;

    @ApiProperty({example: "+998997654321", description: "Mijozning yangi telefon raqami"})
    phone_number?: string;

    @ApiProperty({example: "doston@gmail.com", description: "Mijozning yangi emaili"})
    email?: string;

    @ApiProperty({example: "Doston123!", description: "Mijozning yangi paroli"})
    password?: string;

    @ApiProperty({example: "Buxoriy 102", description: "Mijozning yangi manzili"})
    address?: string;
}
