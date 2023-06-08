import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCarDto {
    @ApiProperty({ example: "Chiron", description: "Mashina modeli" })
    @IsNotEmpty()
    @IsString()
    model: string;

    @ApiProperty({ example: "1", description: "Mashina brendi ID si" })
    @IsNotEmpty()
    @IsInt()
    brand_id: number;

    @ApiProperty({ example: "1", description: "Mashina class ID si" })
    @IsNotEmpty()
    @IsInt()
    class_id: number;

    @ApiProperty({ example: "300000", description: "Mashinaning kunlik ijara narxi" })
    @IsNotEmpty()
    @IsInt()
    price_daily: number;

    @ApiProperty({ example: "black", description: "Mashina rangi" })
    @IsNotEmpty()
    @IsString()
    color: string;

    @ApiProperty({ example: "automatic", description: "Mashina uzatish qutisi turi" })
    @IsNotEmpty()
    @IsString()
    fuel_type: string;

    @ApiProperty({ example: "1", description: "Mashina viloyati ID si" })
    @IsNotEmpty()
    @IsInt()
    region_id: number;

    @ApiProperty({ example: "1", description: "Mashina tumani ID si" })
    @IsNotEmpty()
    @IsInt()
    district_id: number;
}
