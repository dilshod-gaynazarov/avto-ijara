import { ApiProperty } from "@nestjs/swagger";

export class UpdateBrandDto {
    @ApiProperty({ example: "Bugatti", description: "Mashina brendi" })
    name?: string;
}
