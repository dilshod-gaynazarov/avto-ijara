import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { IsAdminGuard } from 'src/guards/is-admin.guard';

@ApiTags("brands")
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  @ApiOperation({ summary: "Yangi brend qo'shish" })
  @UseGuards(IsAdminGuard)
  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @ApiOperation({ summary: "Barcha brendlarni ko'rish" })
  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @ApiOperation({ summary: "Brendni ID si bilan topish" })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.brandService.findOne(id);
  }

  @ApiOperation({ summary: "Brend ma'lumotlarini o'zgartirish" })
  @UseGuards(IsAdminGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(id, updateBrandDto);
  }

  @ApiOperation({ summary: "Brendni o'chirib tashlash" })
  @UseGuards(IsAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.brandService.remove(id);
  }
}
