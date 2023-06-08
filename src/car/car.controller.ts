import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsAdminGuard } from 'src/guards/is-admin.guard';

@ApiTags("cars")
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) { }

  @ApiOperation({ summary: "Yangi mashina qo'shish" })
  @UseGuards(IsAdminGuard)
  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @ApiOperation({ summary: "Barcha mashinalarni ko'rish" })
  @Get()
  findAll() {
    return this.carService.findAll();
  }

  @ApiOperation({ summary: "Mashinani ID si bo'yicha topish" })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.carService.findOne(id);
  }

  @ApiOperation({ summary: "Mashina ma'lumotlarini o'zgartirish" })
  @UseGuards(IsAdminGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(id, updateCarDto);
  }

  @ApiOperation({ summary: "Mashinani o'chirib tashlash" })
  @UseGuards(IsAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.carService.remove(id);
  }
}
