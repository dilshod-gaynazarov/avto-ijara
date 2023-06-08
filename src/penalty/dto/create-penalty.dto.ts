import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreatePenaltyDto {
    @ApiProperty({ example: "1", description: "Buyurtma ID si" })
    @IsNotEmpty()
    @IsInt()
    order_id: number;

    @ApiProperty({ example: "1", description: "Qabul qilingan mashina ID si" })
    @IsNotEmpty()
    @IsInt()
    adopted_car_id: number;

    @ApiProperty({ example: "20000", description: "Jarimaning kunlik qiymati" })
    @IsNotEmpty()
    @IsInt()
    penalty_day_price: number;
}
