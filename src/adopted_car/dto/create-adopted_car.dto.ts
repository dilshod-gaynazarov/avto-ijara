import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty } from "class-validator";

export class CreateAdoptedCarDto {
    @ApiProperty({ example: "1", description: "Buyurtma ID si" })
    @IsNotEmpty()
    @IsInt()
    order_id: number;

    @ApiProperty({ example: "2023-05-23", description: "Mashina qabul qilingan sanasi" })
    @IsDateString()
    adopted_date: Date;
}
