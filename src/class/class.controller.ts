import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { IsAdminGuard } from 'src/guards/is-admin.guard';
import { JwtGuard } from 'src/guards/jwt-auth.guard';

@ApiTags("classes")
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) { }

  @ApiOperation({ summary: "Yangi klass qo'shish" })
  @UseGuards(IsAdminGuard)
  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @ApiOperation({ summary: "Barcha klasslarni ko'rish" })
  @Get()
  findAll() {
    return this.classService.findAll();
  }

  @ApiOperation({ summary: "Klassni ID si bilan topish" })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.classService.findOne(id);
  }

  @ApiOperation({ summary: "Klass ma'lumotlarni o'zgartirish" })
  @UseGuards(IsAdminGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.update(id, updateClassDto);
  }


  @ApiOperation({ summary: "Klassni o'chirib tashlash" })
  @UseGuards(IsAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.classService.remove(id);
  }
}
