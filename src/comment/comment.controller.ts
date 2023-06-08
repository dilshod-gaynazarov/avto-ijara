import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("comments")
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @ApiOperation({ summary: "Yangi izoh qo'shish" })
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }


  @ApiOperation({ summary: "Izohlar ro'yxatini ko'rish" })
  @Get()
  findAll() {
    return this.commentService.findAll();
  }


  @ApiOperation({ summary: "Izohni ID si bilan topish" })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commentService.findOne(id);
  }


  @ApiOperation({ summary: "Izoh ma'lumotlarini o'zgartirish" })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }


  @ApiOperation({ summary: "Izohni o'chirib tashlash" })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commentService.remove(id);
  }
}
