import { ApiProperty } from "@nestjs/swagger";

export class UpdateAdoptedCarDto {
    @ApiProperty({ example: "2", description: "Yangi buyurtma ID si" })
    order_id?: number;

    @ApiProperty({ example: "2023-05-23", description: "Mashinaning yangi qabul qilingan sanasi" })
    adopted_date?: Date;
}
