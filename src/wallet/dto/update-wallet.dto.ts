import { ApiProperty } from "@nestjs/swagger";

export class UpdateWalletDto {
    @ApiProperty({ example: "2", description: "Mijoz ID si" })
    customer_id?: number;

    @ApiProperty({ example: "humo", description: "Yangi bank kartasi turi" })
    type?: string;

    @ApiProperty({ example: "9860 8799 5678 9000", description: "Yangi karta raqami" })
    card?: string;
}
