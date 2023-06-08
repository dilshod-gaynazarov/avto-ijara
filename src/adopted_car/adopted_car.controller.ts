import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdoptedCarService } from './adopted_car.service';
import { CreateAdoptedCarDto } from './dto/create-adopted_car.dto';
import { UpdateAdoptedCarDto } from './dto/update-adopted_car.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsAdminGuard } from 'src/guards/is-admin.guard';

@ApiTags("adopted_cars")
@Controller('adopted-car')
export class AdoptedCarController {
  constructor(private readonly adoptedCarService: AdoptedCarService) { }

  @ApiOperation({ summary: "Yangi qabul qilingan mashina qo'shish" })
  @UseGuards(IsAdminGuard)
  @Post()
  create(@Body() createAdoptedCarDto: CreateAdoptedCarDto) {
    return this.adoptedCarService.create(createAdoptedCarDto);
  }


  @ApiOperation({ summary: "Qabul qilingan mashinalar ro'yxatini ko'rish" })
  @UseGuards(IsAdminGuard)
  @Get()
  findAll() {
    return this.adoptedCarService.findAll();
  }


  @ApiOperation({ summary: "Qabul qilingan mashinani ID si bilan topish" })
  @UseGuards(IsAdminGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.adoptedCarService.findOne(id);
  }


  @ApiOperation({ summary: "Qabul qilingan mashina ma'lumotlarini o'zgartirish" })
  @UseGuards(IsAdminGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAdoptedCarDto: UpdateAdoptedCarDto) {
    return this.adoptedCarService.update(id, updateAdoptedCarDto);
  }


  @ApiOperation({ summary: "Qabul qilingan mashinani ro'yxatdan o'chirish" })
  @UseGuards(IsAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.adoptedCarService.remove(id);
  }
}
