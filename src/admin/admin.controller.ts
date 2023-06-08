import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';
import { Response } from 'express';
import { IsAdminGuard } from 'src/guards/is-admin.guard';

@ApiTags("admins")
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @ApiOperation({ summary: "Admin ro'yxatdan o'tish joyi" })
  @Post('signup')
  registerAdmin(@Body() registerAdminDto: RegisterAdminDto, @Res({ passthrough: true }) res: Response) {
    return this.adminService.registerAdmin(registerAdminDto, res);
  }


  @ApiOperation({ summary: "Admin logindan o'tish joyi" })
  @Post('signin')
  loginAdmin(@Body() loginAdminDto: LoginAdminDto, @Res({ passthrough: true }) res: Response) {
    return this.adminService.loginAdmin(loginAdminDto, res);
  }


  @ApiOperation({ summary: 'Mijozning saytdan chiqish joyi' })
  @Post('logout')
  logoutAdmin(@CookieGetter('refresh_token') refreshToken: string, @Res({ passthrough: true }) res: Response) {
    return this.adminService.logoutAdmin(refreshToken, res);
  }


  @ApiOperation({ summary: "Refresh tokenni yangilash" })
  @UseGuards(IsAdminGuard)
  @Post(':id/refreshToken')
  refreshTokenAdmin(@Param('id') id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response) {
    return this.adminService.refreshTokenAdmin(id, refreshToken, res);
  }


  @ApiOperation({ summary: "Barcha adminlarni ko'rish" })
  @UseGuards(IsAdminGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }


  @ApiOperation({ summary: "Adminni ID si bo'yicha topish" })
  @UseGuards(IsAdminGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.adminService.findOne(id);
  }


  @ApiOperation({ summary: "Adminning ma'lumotlarini o'zgartirish" })
  @UseGuards(IsAdminGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }


  @ApiOperation({ summary: "Adminni o'chirib tashlash" })
  @UseGuards(IsAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.adminService.remove(id);
  }
}
