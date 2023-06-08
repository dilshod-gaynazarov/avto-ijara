import { ApiProperty } from "@nestjs/swagger";

export class UpdateCarDto {
    @ApiProperty({ example: "Veron", description: "Mashinaning yangi modeli" })
    model?: string;

    @ApiProperty({ example: "2", description: "Mashinaning yangi brend ID si" })
    brand_id?: number;

    @ApiProperty({ example: "2", description: "Mashinaning yangi class ID si" })
    class_id?: number;

    @ApiProperty({ example: "200000", description: "Mashinaning yangi kunlik ijara narxi" })
    price_daily?: number;

    @ApiProperty({ example: "white", description: "Mashina yangi rangi" })
    color?: string;

    @ApiProperty({ example: "mechanic", description: "Mashinaning yangi uzatish qutisi turi" })
    fuel_type?: string;

    @ApiProperty({ example: "2", description: "Mashina yangi viloyat ID si" })
    region_id?: number;

    @ApiProperty({ example: "2", description: "Mashinaning yangi tuman ID si" })
    district_id?: number;
}
