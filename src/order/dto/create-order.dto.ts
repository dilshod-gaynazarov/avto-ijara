import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty } from "class-validator";

export class CreateOrderDto {
    @ApiProperty({ example: "1", description: "Mashina ID si" })
    @IsNotEmpty()
    @IsInt()
    car_id: number;

    @ApiProperty({ example: "1", description: "Mijoz ID si" })
    @IsNotEmpty()
    @IsInt()
    customer_id: number;

    @ApiProperty({ example: "2023.04.05", description: "Mashina ijarasining boshlanish vaqti" })
    @IsNotEmpty()
    @IsDateString()
    start_time: Date;

    @ApiProperty({ example: "2023.04.06", description: "Mashina ijarasining tugash vaqti" })
    @IsNotEmpty()
    @IsDateString()
    finish_time: Date;
}
