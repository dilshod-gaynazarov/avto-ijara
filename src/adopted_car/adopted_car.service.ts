import { Injectable } from '@nestjs/common';
import { CreateAdoptedCarDto } from './dto/create-adopted_car.dto';
import { UpdateAdoptedCarDto } from './dto/update-adopted_car.dto';
import { InjectModel } from '@nestjs/sequelize';
import { AdoptedCar } from './models/adopted_car.model';

@Injectable()
export class AdoptedCarService {
  constructor(
    @InjectModel(AdoptedCar) private adoptedCarRepository: typeof AdoptedCar,
  ) { }

  async create(createAdoptedCarDto: CreateAdoptedCarDto): Promise<AdoptedCar> {
    const adopted_car = await this.adoptedCarRepository.create({ ...createAdoptedCarDto, is_adopted: true });
    return adopted_car;
  }

  async findAll(): Promise<AdoptedCar[]> {
    const adopted_cars = await this.adoptedCarRepository.findAll();
    return adopted_cars;
  }

  async findOne(id: number): Promise<AdoptedCar> {
    const adopted_car = await this.adoptedCarRepository.findOne({ where: { id } });
    return adopted_car;
  }

  async update(id: number, updateAdoptedCarDto: UpdateAdoptedCarDto): Promise<AdoptedCar> {
    const adopted_car = await this.adoptedCarRepository.update(
      updateAdoptedCarDto, { where: { id }, returning: true }
    );
    return adopted_car[1][0];
  }

  async remove(id: number): Promise<Object> {
    const adopted_car = await this.adoptedCarRepository.findByPk(id);
    await this.adoptedCarRepository.destroy({ where: { id } });
    return { message: "Removed adopted_car", adopted_car };
  }
}
