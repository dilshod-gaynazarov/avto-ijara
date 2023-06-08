import { Injectable } from '@nestjs/common';
import { CreatePenaltyDto } from './dto/create-penalty.dto';
import { UpdatePenaltyDto } from './dto/update-penalty.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Penalty } from './models/penalty.model';
import { Order } from 'src/order/models/order.model';
import { AdoptedCar } from 'src/adopted_car/models/adopted_car.model';

@Injectable()
export class PenaltyService {
  constructor(
    @InjectModel(Penalty) private penaltyRepository: typeof Penalty,
    @InjectModel(Order) private orderRepository: typeof Order,
    @InjectModel(AdoptedCar) private adoptedCarRepository: typeof AdoptedCar,
  ) { }

  async create(createPenaltyDto: CreatePenaltyDto): Promise<Penalty> {
    const order = await this.orderRepository.findOne({ where: { id: createPenaltyDto.order_id } });
    const adopted_car = await this.adoptedCarRepository.findOne({ where: { id: createPenaltyDto.adopted_car_id } });
    const finish_time = new Date(order.finish_time);
    const adopted_car_time = new Date(adopted_car.adopted_date);
    const time = adopted_car_time.getTime() - finish_time.getTime();
    const day = new Date(time).toLocaleDateString().split('/')[1];
    const month = new Date(time).toLocaleDateString().split('/')[0];
    const penalty_date = (+month - 1) * 30 + (+day - 1);
    const penalty_amount = penalty_date * createPenaltyDto.penalty_day_price;
    const penalty = await this.penaltyRepository.create(
      { ...createPenaltyDto, penalty_amount, is_paid_penalty: true }
    );
    return penalty;
  }

  async findAll(): Promise<Penalty[]> {
    const penalties = await this.penaltyRepository.findAll();
    return penalties;
  }

  async findOne(id: number): Promise<Penalty> {
    const penalty = await this.penaltyRepository.findOne({ where: { id } });
    return penalty;
  }

  async update(id: number, updatePenaltyDto: UpdatePenaltyDto): Promise<Penalty> {
    let order: Order;
    if (!updatePenaltyDto.order_id) {
      const penalty_data = await this.penaltyRepository.findByPk(id);
      order = await this.orderRepository.findOne({ where: { id: penalty_data.order_id } });
    } else {
      order = await this.orderRepository.findOne({ where: { id: updatePenaltyDto.order_id } });
    };
    let adopted_car: AdoptedCar;
    if (!updatePenaltyDto.adopted_car_id) {
      const penalty_data = await this.penaltyRepository.findByPk(id);
      adopted_car = await this.adoptedCarRepository.findOne({ where: { id: penalty_data.adopted_car_id } });
    } else {
      adopted_car = await this.adoptedCarRepository.findOne({ where: { id: updatePenaltyDto.adopted_car_id } });
    }
    const finish_time = new Date(order.finish_time);
    const adopted_car_time = new Date(adopted_car.adopted_date);
    const time = adopted_car_time.getTime() - finish_time.getTime();
    const day = new Date(time).toLocaleDateString().split('/')[1];
    const month = new Date(time).toLocaleDateString().split('/')[0];
    const penalty_date = (+month - 1) * 30 + (+day - 1);
    const penalty_amount = penalty_date * updatePenaltyDto.penalty_day_price;
    const penalty = await this.penaltyRepository.update(
      { ...updatePenaltyDto, penalty_amount, is_paid_penalty: true }, { where: { id }, returning: true }
    );
    return penalty[1][0];
  }

  async remove(id: number): Promise<Object> {
    const penalty = await this.penaltyRepository.findByPk(id);
    await this.penaltyRepository.destroy({ where: { id } });
    return { message: "Removed penalty", penalty };
  }
}
