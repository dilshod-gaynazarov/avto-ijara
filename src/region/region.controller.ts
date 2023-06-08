import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsAdminGuard } from 'src/guards/is-admin.guard';
import { JwtGuard } from 'src/guards/jwt-auth.guard';

@ApiTags("regions")
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) { }

  @ApiOperation({ summary: "Yangi viloyat qo'shish" })
  @UseGuards(IsAdminGuard)
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @ApiOperation({ summary: "Barcha viloyatlarni ko'rish" })
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.regionService.findAll();
  }

  @ApiOperation({ summary: "Viloyatni ID si bo'yicha olish" })
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.regionService.findOne(id);
  }

  @ApiOperation({ summary: "Viloyat ma'lumotlarini o'zgartirish" })
  @UseGuards(IsAdminGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(id, updateRegionDto);
  }

  @ApiOperation({ summary: "Viloyatni o'chirib tashlash" })
  @UseGuards(IsAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.regionService.remove(id);
  }
}
