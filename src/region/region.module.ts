import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Region } from './models/region.model';
import { District } from 'src/district/models/district.model';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Region, District]),
    JwtModule.register({}),
  ],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule { }
