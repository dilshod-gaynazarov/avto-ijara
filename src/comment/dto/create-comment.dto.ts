import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
    @ApiProperty({ example: "1", description: "Mashina ID si" })
    @IsNotEmpty()
    @IsInt()
    car_id: number;

    @ApiProperty({ example: "1", description: "Mijoz ID si" })
    @IsNotEmpty()
    @IsInt()
    customer_id: number;

    @ApiProperty({ example: "Yaxshi mashina ekan", description: "Mashinaga mijozning taasurotlar" })
    @IsString()
    impression: string;
}
