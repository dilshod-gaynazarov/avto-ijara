import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, } from "class-validator";

export class CreatePaymentDto {
    @ApiProperty({ example: "1", description: "Buyurtma ID si" })
    @IsNotEmpty()
    @IsInt()
    order_id: number;

    @ApiProperty({ example: "1", description: "Mijoz ID si" })
    @IsNotEmpty()
    @IsInt()
    customer_id: number;

    @ApiProperty({ example: "1", description: "Mijoz hamyonining ID si" })
    @IsNotEmpty()
    @IsInt()
    wallet_id: number;
}
