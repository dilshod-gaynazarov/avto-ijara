import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { OtpService } from './otp.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmailCustomerDto } from './dto/email-customer.dto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { IsAdminGuard } from 'src/guards/is-admin.guard';
import { UserSelfGuard } from 'src/guards/user-self.guard';
import { JwtGuard } from 'src/guards/jwt-auth.guard';

@ApiTags("otps")
@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) { }

  @ApiOperation({ summary: "OTP jo'natish" })
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtGuard)
  @Post('otp')
  newOtp(@Body() emailCustomerDto: EmailCustomerDto) {
    return this.otpService.newOtp(emailCustomerDto);
  }


  @ApiOperation({ summary: 'OTPni tekshirish' })
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtGuard)
  @Post('verifyOtp')
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.otpService.verifyOtp(verifyOtpDto);
  }


  @ApiOperation({ summary: "OTPlar ro'yxatini ko'rish" })
  @UseGuards(IsAdminGuard)
  @Get()
  findAll() {
    return this.otpService.findAll();
  }


  @ApiOperation({ summary: "OTP ni ID si bo'yicha topish" })
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.otpService.findOne(id);
  }


  @ApiOperation({ summary: "OTP ni o'chirib tashlash" })
  @UseGuards(IsAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.otpService.remove(id);
  }
}
