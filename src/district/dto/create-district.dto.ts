import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt } from "class-validator";

export class CreateDistrictDto {
    @ApiProperty({ example: "1", description: "Viloyat ID si" })
    @IsNotEmpty()
    @IsInt()
    region_id: number;

    @ApiProperty({ example: "Shayxontohur", description: "Tuman nomi" })
    @IsNotEmpty()
    @IsString()
    name: string;
}
