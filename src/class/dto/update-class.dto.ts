import { ApiProperty } from "@nestjs/swagger";

export class UpdateClassDto {
    @ApiProperty({ example: "Premium", description: "Mashinaning yangi klassi" })
    name?: string;
}
