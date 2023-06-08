import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Class } from './models/class.model';
import { Car } from 'src/car/models/car.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Class, Car]),
    JwtModule.register({})
  ],
  controllers: [ClassController],
  providers: [ClassService]
})
export class ClassModule { }
