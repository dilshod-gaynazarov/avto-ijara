import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';
import { Car } from 'src/car/models/car.model';
import { Customer } from 'src/customer/models/customer.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Comment, Car, Customer]),
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule { }
