import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';
import { Order } from 'src/order/models/order.model';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment) private paymentRepository: typeof Payment,
    @InjectModel(Order) private orderRepository: typeof Order,
  ) { }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const order = await this.orderRepository.findOne({ where: { id: createPaymentDto.order_id } });
    const payment = await this.paymentRepository.create(
      { ...createPaymentDto, payment_date: order.start_time, payment_status: true }
    );
    return payment;
  }

  async findAll(): Promise<Payment[]> {
    const payments = await this.paymentRepository.findAll();
    return payments;
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.paymentRepository.update(updatePaymentDto, { where: { id }, returning: true });
    return payment[1][0];
  }

  async remove(id: number): Promise<Object> {
    const payment = await this.paymentRepository.findByPk(id);
    await this.paymentRepository.destroy({ where: { id } });
    return { message: "Removed payment", payment }
  }
}
