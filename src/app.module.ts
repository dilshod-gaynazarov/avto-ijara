import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './admin/models/admin.model';
import { RegionModule } from './region/region.module';
import { Region } from './region/models/region.model';
import { DistrictModule } from './district/district.module';
import { District } from './district/models/district.model';
import { BrandModule } from './brand/brand.module';
import { ClassModule } from './class/class.module';
import { Brand } from './brand/models/brand.model';
import { Class } from './class/models/class.model';
import { CarModule } from './car/car.module';
import { Car } from './car/models/car.model';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/models/customer.model';
import { MailModule } from './mail/mail.module';
import { Otp } from './otp/models/otp.model';
import { OtpModule } from './otp/otp.module';
import { OrderModule } from './order/order.module';
import { Order } from './order/models/order.model';
import { PaymentModule } from './payment/payment.module';
import { Payment } from './payment/models/payment.model';
import { WalletModule } from './wallet/wallet.module';
import { Wallet } from './wallet/models/wallet.model';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/models/comment.model';
import { PenaltyModule } from './penalty/penalty.module';
import { AdoptedCarModule } from './adopted_car/adopted_car.module';
import { AdoptedCar } from './adopted_car/models/adopted_car.model';
import { Penalty } from './penalty/models/penalty.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [
        Admin,
        Region,
        District,
        Brand,
        Class,
        Car,
        Customer,
        Otp,
        Order,
        Payment,
        Wallet,
        Comment,
        AdoptedCar,
        Penalty
      ],
      autoLoadModels: true,
      logging: true,
    }),
    AdminModule,
    RegionModule,
    DistrictModule,
    BrandModule,
    ClassModule,
    CarModule,
    CustomerModule,
    MailModule,
    OtpModule,
    OrderModule,
    PaymentModule,
    WalletModule,
    CommentModule,
    PenaltyModule,
    AdoptedCarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
