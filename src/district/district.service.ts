import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectModel } from '@nestjs/sequelize';
import { District } from './models/district.model';

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District) private districtRepository: typeof District,
  ) { }

  async create(createDistrictDto: CreateDistrictDto): Promise<District> {
    const district = await this.districtRepository.create(createDistrictDto);
    return district;
  }

  async findAll(): Promise<District[]> {
    const districts = await this.districtRepository.findAll();
    return districts;
  }

  async findOne(id: number): Promise<District> {
    const district = await this.districtRepository.findByPk(id);
    return district;
  }

  async update(id: number, updateDistrictDto: UpdateDistrictDto): Promise<District> {
    const district = await this.districtRepository.update(updateDistrictDto, { where: { id }, returning: true });
    return district[1][0];
  }

  async remove(id: number): Promise<Object> {
    const district = await this.districtRepository.findByPk(id);
    await this.districtRepository.destroy({ where: { id } });
    return { message: "Removed district", district };
  }

}
