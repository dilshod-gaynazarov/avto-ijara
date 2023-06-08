import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { Car } from 'src/car/models/car.model';
import { Customer } from 'src/customer/models/customer.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Order, Car, Customer]),
    JwtModule.register({})
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule { }
