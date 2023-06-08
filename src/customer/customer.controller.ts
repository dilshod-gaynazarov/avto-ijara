import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';
import { VerifyOtpDto } from '../otp/dto/verifyOtp.dto';
import { EmailCustomerDto } from '../otp/dto/email-customer.dto';
import { IsAdminGuard } from 'src/guards/is-admin.guard';
import { UserSelfGuard } from 'src/guards/user-self.guard';
import { JwtGuard } from 'src/guards/jwt-auth.guard';

@ApiTags("customers")
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @ApiOperation({ summary: "Mijoz ro'yxatdan o'tish joyi" })
  @Post('signup')
  register(@Body() registerCustomerDto: RegisterCustomerDto, @Res({ passthrough: true }) res: Response) {
    return this.customerService.register(registerCustomerDto, res);
  }


  @ApiOperation({ summary: "Mijoz logindan o'tish joyi" })
  @Post('signin')
  login(@Body() loginCustomerDto: LoginCustomerDto, @Res({ passthrough: true }) res: Response) {
    return this.customerService.login(loginCustomerDto, res);
  }


  @ApiOperation({ summary: 'Mijozning saytdan chiqish joyi' })
  @Post('logout')
  logout(@CookieGetter('refresh_token') refreshToken: string, @Res({ passthrough: true }) res: Response) {
    return this.customerService.logout(refreshToken, res);
  }


  @ApiOperation({ summary: "Refresh tokenni yangilash" })
  @UseGuards(IsAdminGuard)
  @Post(':id/refreshToken')
  refreshToken(@Param('id') id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response) {
    return this.customerService.refreshToken(id, refreshToken, res);
  }


  @ApiOperation({ summary: "Barcha mijozlar ro'yxatini ko'rish" })
  @UseGuards(IsAdminGuard)
  @Get()
  findAll() {
    return this.customerService.findAll();
  }


  @ApiOperation({ summary: "Mijozni ID si bo'yich topish" })
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.customerService.findOne(id);
  }


  @ApiOperation({ summary: "Mijoz ma'lumotlarini o'zgartirish" })
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(id, updateCustomerDto);
  }


  @ApiOperation({ summary: "Mijozni o'chirib tashlash" })
  @UseGuards(IsAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.customerService.remove(id);
  }
}
