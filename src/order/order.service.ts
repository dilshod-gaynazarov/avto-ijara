import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { Car } from 'src/car/models/car.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private orderRepository: typeof Order,
    @InjectModel(Car) private carRepository: typeof Car,
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const start_time = new Date(createOrderDto.start_time);
    const finish_time = new Date(createOrderDto.finish_time);
    if (finish_time < start_time) {
      throw new BadRequestException("Vaqtni belgilashda xatolik!");
    };
    const time = finish_time.getTime() - start_time.getTime();
    const day = new Date(time).toLocaleDateString().split('/')[1];
    const month = new Date(time).toLocaleDateString().split('/')[0];
    const rent_day = (+month - 1) * 30 + (+day - 1);
    const car = await this.carRepository.findOne({ where: { id: createOrderDto.car_id } });
    const total_amount = rent_day * car.price_daily;
    const order = await this.orderRepository.create({ ...createOrderDto, total_amount });
    return order;
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderRepository.findAll();
    return orders;
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const start_time = new Date(updateOrderDto.start_time);
    const finish_time = new Date(updateOrderDto.finish_time);
    if (finish_time < start_time) {
      throw new BadRequestException("Vaqtni belgilashda xatolik!");
    };
    const time = finish_time.getTime() - start_time.getTime();
    const day = new Date(time).toLocaleDateString().split('/')[1];
    const month = new Date(time).toLocaleDateString().split('/')[0];
    const rent_day = (+month - 1) * 30 + (+day - 1);
    let car: Car;
    if (!updateOrderDto.car_id) {
      const order_data = await this.orderRepository.findByPk(id);
      car = await this.carRepository.findOne({ where: { id: order_data.car_id } });
    } else {
      car = await this.carRepository.findOne({ where: { id: updateOrderDto.car_id } });
    }
    const total_amount = rent_day * car.price_daily;
    const order = await this.orderRepository.update(
      { ...updateOrderDto, total_amount }, { where: { id }, returning: true });
    return order[1][0];
  }

  async remove(id: number): Promise<Object> {
    const order = await this.orderRepository.findByPk(id);
    await this.orderRepository.destroy({ where: { id } });
    return { message: "Removed order", order };
  }
}
