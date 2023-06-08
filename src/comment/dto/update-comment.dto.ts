import { ApiProperty } from "@nestjs/swagger";

export class UpdateCommentDto {
    @ApiProperty({ example: "2", description: "Yangi mashina ID si" })
    car_id?: number;

    @ApiProperty({ example: "2", description: "Yangi mijoz ID si" })
    customer_id?: number;

    @ApiProperty({ example: "Mashina super", description: "Yangi mashinaga mijozning taasurotlar" })
    impression?: string;
}
