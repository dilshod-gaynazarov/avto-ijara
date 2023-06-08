import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateWalletDto {
    @ApiProperty({ example: "1", description: "Mijoz ID si" })
    @IsNotEmpty()
    @IsInt()
    customer_id: number;

    @ApiProperty({ example: "uzcard", description: "Bank kartasi turi" })
    @IsNotEmpty()
    @IsString()
    type: string;

    @ApiProperty({ example: "8600 1234 5678 9000", description: "Karta raqami" })
    @IsNotEmpty()
    @IsString()
    card: string;
}
