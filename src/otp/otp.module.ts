import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Otp } from './models/otp.model';
import { Customer } from 'src/customer/models/customer.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Otp, Customer]),
    JwtModule.register({})
  ],
  controllers: [OtpController],
  providers: [OtpService]
})
export class OtpModule { }
