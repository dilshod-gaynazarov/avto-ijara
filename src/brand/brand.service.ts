import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './models/brand.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand) private brandRepository: typeof Brand,
  ) { }

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const brand = await this.brandRepository.create(createBrandDto);
    return brand;
  }

  async findAll(): Promise<Brand[]> {
    const brands = await this.brandRepository.findAll({ include: { all: true } });
    return brands;
  }

  async findOne(id: number): Promise<Brand> {
    const brand = await this.brandRepository.findByPk(id, { include: { all: true } });
    return brand;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    const brand = await this.brandRepository.update(updateBrandDto, { where: { id }, returning: true });
    return brand[1][0];
  }

  async remove(id: number): Promise<Object> {
    const brand = await this.brandRepository.findByPk(id);
    await this.brandRepository.destroy({ where: { id } });
    return { message: "Removed brand", brand };
  }
}
