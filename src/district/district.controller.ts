import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { IsAdminGuard } from 'src/guards/is-admin.guard';
import { JwtGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('districts')
@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) { }

  @ApiOperation({ summary: "Yangi tuman qo'shish" })
  @UseGuards(IsAdminGuard)
  @Post()
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  @ApiOperation({ summary: "Barcha tumanlarni ko'rish" })
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.districtService.findAll();
  }

  @ApiOperation({ summary: "Tuman ID si bilan topish" })
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.districtService.findOne(id);
  }

  @ApiOperation({ summary: "Tuman ma'lumotlarini o'zgartirish" })
  @UseGuards(IsAdminGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDistrictDto: UpdateDistrictDto) {
    return this.districtService.update(id, updateDistrictDto);
  }

  @ApiOperation({ summary: "Tumanni o'chirib tashlash" })
  @UseGuards(IsAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.districtService.remove(id);
  }
}
