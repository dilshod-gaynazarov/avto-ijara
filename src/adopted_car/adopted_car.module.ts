import { Module } from '@nestjs/common';
import { AdoptedCarService } from './adopted_car.service';
import { AdoptedCarController } from './adopted_car.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdoptedCar } from './models/adopted_car.model';
import { Order } from 'src/order/models/order.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([AdoptedCar, Order]),
    JwtModule.register({})
  ],
  controllers: [AdoptedCarController],
  providers: [AdoptedCarService]
})
export class AdoptedCarModule { }
