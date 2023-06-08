import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wallet } from './models/wallet.model';
import { Customer } from 'src/customer/models/customer.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Wallet, Customer]),
    JwtModule.register({})
  ],
  controllers: [WalletController],
  providers: [WalletService]
})
export class WalletModule { }
