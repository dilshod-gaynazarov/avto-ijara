import { ApiProperty } from "@nestjs/swagger";

export class UpdatePaymentDto {
    @ApiProperty({ example: "2", description: "Buyurtmaning yangi ID si" })
    order_id?: number;

    @ApiProperty({ example: "2", description: "Mijozning yangi ID si" })
    customer_id?: number;

    @ApiProperty({ example: "2", description: "Mijozning yangi hamyon ID si" })
    wallet_id?: number;
}
