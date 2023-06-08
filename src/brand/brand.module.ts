import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from './models/brand.model';
import { Car } from 'src/car/models/car.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Brand, Car]),
    JwtModule.register({})
  ],
  controllers: [BrandController],
  providers: [BrandService]
})
export class BrandModule { }
