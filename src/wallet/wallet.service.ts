import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Wallet } from './models/wallet.model';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet) private walletRepository: typeof Wallet,
  ) { }

  async create(createWalletDto: CreateWalletDto): Promise<Wallet> {
    const wallet = await this.walletRepository.create(createWalletDto);
    return wallet;
  }

  async findAll(): Promise<Wallet[]> {
    const wallets = await this.walletRepository.findAll();
    return wallets;
  }

  async findOne(id: number): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne({ where: { id } });
    return wallet;
  }

  async update(id: number, updateWalletDto: UpdateWalletDto): Promise<Wallet> {
    const wallet = await this.walletRepository.update(updateWalletDto, { where: { id }, returning: true });
    return wallet[1][0];
  }

  async remove(id: number): Promise<Object> {
    const wallet = await this.walletRepository.findByPk(id);
    await this.walletRepository.destroy({ where: { id } });
    return { message: "Removed wallet", wallet };
  }
}
