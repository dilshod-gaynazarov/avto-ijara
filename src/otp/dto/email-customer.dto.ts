import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class EmailCustomerDto {
    @ApiProperty({ example: "john@gamil.com" })
    @IsEmail()
    email: string;
}