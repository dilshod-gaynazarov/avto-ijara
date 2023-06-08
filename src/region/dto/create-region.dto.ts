import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRegionDto {
    @ApiProperty({ example: "Toshkent", description: "Viloyat nomi" })
    @IsNotEmpty()
    @IsString()
    name: string;
}
