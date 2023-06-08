import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from './models/car.model';
import { Brand } from 'src/brand/models/brand.model';
import { Class } from 'src/class/models/class.model';
import { Region } from 'src/region/models/region.model';
import { District } from 'src/district/models/district.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Car, Brand, Class, Region, District]),
    JwtModule.register({})
  ],
  controllers: [CarController],
  providers: [CarService]
})
export class CarModule { }
