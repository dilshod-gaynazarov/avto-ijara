import { Module } from '@nestjs/common';
import { PenaltyService } from './penalty.service';
import { PenaltyController } from './penalty.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Penalty } from './models/penalty.model';
import { Order } from 'src/order/models/order.model';
import { AdoptedCar } from 'src/adopted_car/models/adopted_car.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Penalty, Order, AdoptedCar]),
    JwtModule.register({})
  ],
  controllers: [PenaltyController],
  providers: [PenaltyService]
})
export class PenaltyModule { }
