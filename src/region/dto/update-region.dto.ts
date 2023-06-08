import { ApiProperty } from "@nestjs/swagger";

export class UpdateRegionDto {
    @ApiProperty({ example: "Toshkent", description: "Viloyat nomi" })
    name?: string;
}
