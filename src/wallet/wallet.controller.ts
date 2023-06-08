import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserSelfGuard } from 'src/guards/user-self.guard';
import { JwtGuard } from 'src/guards/jwt-auth.guard';
import { IsAdminGuard } from 'src/guards/is-admin.guard';

@ApiTags("wallets")
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) { }

  @ApiOperation({ summary: "Yangi hamyon qo'shish" })
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto);
  }


  @ApiOperation({ summary: "Hamyonlar ro'yxatini ko'rish" })
  @UseGuards(IsAdminGuard)
  @Get()
  findAll() {
    return this.walletService.findAll();
  }


  @ApiOperation({ summary: "Hamyonni ID si bo'yicha topish" })
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.walletService.findOne(id);
  }


  @ApiOperation({ summary: "Hamyon ma'lumotlarini o'zgartirish" })
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(id, updateWalletDto);
  }


  @ApiOperation({ summary: "Hamyonni o'chirib tashlash" })
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.walletService.remove(id);
  }
}
