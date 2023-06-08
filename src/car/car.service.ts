import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Car } from './models/car.model';

@Injectable()
export class CarService {
  constructor(
    @InjectModel(Car) private carRepository: typeof Car,
  ) { }

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const car = await this.carRepository.create(createCarDto);
    return car;
  }

  async findAll(): Promise<Car[]> {
    const cars = await this.carRepository.findAll();
    return cars;
  }

  async findOne(id: number): Promise<Car> {
    const car = await this.carRepository.findByPk(id);
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    const car = await this.carRepository.update(updateCarDto, { where: { id }, returning: true });
    return car[1][0];
  }

  async remove(id: number): Promise<Object> {
    const car = await this.carRepository.findByPk(id);
    await this.carRepository.destroy({ where: { id } });
    return { message: "Removed car", car };
  }
}
