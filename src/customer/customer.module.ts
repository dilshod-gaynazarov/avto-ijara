import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from './models/customer.model';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import { Otp } from '../otp/models/otp.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Customer]),
    MailModule,
    JwtModule.register({}),
  ],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule { }
