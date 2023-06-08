import { ApiProperty } from "@nestjs/swagger";

export class UpdatePenaltyDto {
    @ApiProperty({ example: "2", description: "Buyurtma ID si" })
    order_id?: number;

    @ApiProperty({ example: "2", description: "Yagni qabul qilingan mashina ID si" })
    adopted_car_id?: number;

    @ApiProperty({ example: "30000", description: "Jarimaning yangi kunlik qiymati" })
    penalty_day_price?: number;
}
