import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class VerifyOtpDto {
    @ApiProperty({example: "johndoe@gmail.com", description: "Customer emaili"})
    @IsEmail()
    check: string;

    @ApiProperty({example: "encoded information", description: "Otp verifikatsiyasi"})
    @IsNotEmpty()
    @IsString()
    verification_key: string;

    @ApiProperty({example: "3591", description: "Otp"})
    @IsNotEmpty()
    @IsString()
    otp: string;
}