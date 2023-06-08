import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBrandDto {
    @ApiProperty({ example: "Bugatti", description: "Mashina brendi" })
    @IsNotEmpty()
    @IsString()
    name: string;
}
