import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PenaltyService } from './penalty.service';
import { CreatePenaltyDto } from './dto/create-penalty.dto';
import { UpdatePenaltyDto } from './dto/update-penalty.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsAdminGuard } from 'src/guards/is-admin.guard';
import { UserSelfGuard } from 'src/guards/user-self.guard';
import { JwtGuard } from 'src/guards/jwt-auth.guard';

@ApiTags("penalties")
@Controller('penalty')
export class PenaltyController {
  constructor(private readonly penaltyService: PenaltyService) { }

  @ApiOperation({ summary: "Yangi jarima qo'shish" })
  @UseGuards(IsAdminGuard)
  @Post()
  create(@Body() createPenaltyDto: CreatePenaltyDto) {
    return this.penaltyService.create(createPenaltyDto);
  }


  @ApiOperation({ summary: "Jarimalar ro'yxatini ko'rish" })
  @UseGuards(IsAdminGuard)
  @Get()
  findAll() {
    return this.penaltyService.findAll();
  }


  @ApiOperation({ summary: "Jarimani ID si bilan topish" })
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.penaltyService.findOne(id);
  }


  @ApiOperation({ summary: "Jarima ma'lumotlarini o'zgartirish" })
  @UseGuards(IsAdminGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePenaltyDto: UpdatePenaltyDto) {
    return this.penaltyService.update(id, updatePenaltyDto);
  }


  @ApiOperation({ summary: "Jarimani ro'yxatdan o'chirib tashlash" })
  @UseGuards(IsAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.penaltyService.remove(id);
  }
}
