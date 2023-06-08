import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Brand } from "src/brand/models/brand.model";
import { Class } from "src/class/models/class.model";
import { District } from "src/district/models/district.model";
import { Region } from "src/region/models/region.model";

interface CarAttr {
    model: string;
    price_daily: number;
    color: string;
    fuel_type: string;
}

@Table({ tableName: "car" })
export class Car extends Model<Car, CarAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    model: string;

    @ForeignKey(() => Brand)
    @Column({
        type: DataType.INTEGER,
    })
    brand_id: number;

    @BelongsTo(() => Brand)
    brand: Brand;

    @ForeignKey(() => Class)
    @Column({
        type: DataType.INTEGER,
    })
    class_id: number;

    @BelongsTo(() => Class)
    class: Class;

    @Column({
        type: DataType.INTEGER,
    })
    price_daily: number;

    @Column({
        type: DataType.STRING,
    })
    color: string;

    @Column({
        type: DataType.STRING,
    })
    fuel_type: string;

    @ForeignKey(() => Region)
    @Column({
        type: DataType.INTEGER,
    })
    region_id: number;

    @BelongsTo(() => Region)
    region: Region;

    @ForeignKey(() => District)
    @Column({
        type: DataType.INTEGER,
    })
    district_id: number;

    @BelongsTo(() => District)
    district: District;
};