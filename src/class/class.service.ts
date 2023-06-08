import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Class } from './models/class.model';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class) private classRepository: typeof Class
  ) { }

  async create(createClassDto: CreateClassDto): Promise<Class> {
    const new_class = await this.classRepository.create(createClassDto);
    return new_class;
  }

  async findAll(): Promise<Class[]> {
    const classes = await this.classRepository.findAll({ include: { all: true } });
    return classes;
  }

  async findOne(id: number): Promise<Class> {
    const one_class = await this.classRepository.findByPk(id, { include: { all: true } });
    return one_class;
  }

  async update(id: number, updateClassDto: UpdateClassDto): Promise<Class> {
    const update_class = await this.classRepository.update(updateClassDto, { where: { id }, returning: true });
    return update_class[1][0];
  }

  async remove(id: number): Promise<Object> {
    const remove_class = await this.classRepository.findByPk(id);
    await this.classRepository.destroy({ where: { id } });
    return { message: "Removed class", remove_class };
  }
}
