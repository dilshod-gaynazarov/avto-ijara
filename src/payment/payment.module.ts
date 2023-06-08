import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';
import { Order } from 'src/order/models/order.model';
import { Customer } from 'src/customer/models/customer.model';
import { Wallet } from 'src/wallet/models/wallet.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Payment, Order, Customer, Wallet]),
    JwtModule.register({})
  ],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule { }
