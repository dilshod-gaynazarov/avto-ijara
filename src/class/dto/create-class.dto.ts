import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateClassDto {
    @ApiProperty({ example: "Comfort", description: "Mashina klassi" })
    @IsNotEmpty()
    @IsString()
    name: string;
}
