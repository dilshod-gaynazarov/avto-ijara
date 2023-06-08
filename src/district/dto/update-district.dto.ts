import { ApiProperty } from "@nestjs/swagger";

export class UpdateDistrictDto {
    @ApiProperty({ example: "2", description: "Yangi viloyat ID si" })
    region_id?: number;

    @ApiProperty({ example: "Olmazor", description: "Tumanning yangi nomi" })
    name?: string;
}
