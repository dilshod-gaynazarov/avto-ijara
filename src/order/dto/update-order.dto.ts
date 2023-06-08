import { ApiProperty } from "@nestjs/swagger";

export class UpdateOrderDto {
    @ApiProperty({ example: "1", description: "Mashinaning yangi ID si" })
    car_id?: number;

    @ApiProperty({ example: "1", description: "Mijozning yangi ID si" })
    customer_id?: number;

    @ApiProperty({ example: "2023.04.05", description: "Mashina ijarasining yangi boshlanish vaqti" })
    start_time?: Date;

    @ApiProperty({ example: "2023.04.06", description: "Mashina ijarasining yangi tugash vaqti" })
    finish_time?: Date;
}
