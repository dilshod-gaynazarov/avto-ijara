import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './models/region.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region) private regionRepository: typeof Region,
  ) { }

  async create(createRegionDto: CreateRegionDto): Promise<Region> {
    const region = await this.regionRepository.create(createRegionDto);
    return region;
  }

  async findAll(): Promise<Region[]> {
    const regions = await this.regionRepository.findAll({ include: { all: true } });
    return regions;
  }

  async findOne(id: number): Promise<Region> {
    const region = await this.regionRepository.findByPk(id, { include: { all: true } });
    return region;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto): Promise<Region> {
    const region = await this.regionRepository.update(updateRegionDto, { where: { id }, returning: true });
    return region[1][0];
  }

  async remove(id: number): Promise<Object> {
    const region = await this.regionRepository.findByPk(id);
    await this.regionRepository.destroy({ where: { id } });
    return { message: "Removed region", region };
  }

}
