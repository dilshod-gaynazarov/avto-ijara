import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Car } from "src/car/models/car.model";

interface BrandAttr {
    name: string;
}

@Table({ tableName: "brand" })
export class Brand extends Model<Brand, BrandAttr> {
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
    name: string;

    @HasMany(() => Car)
    cars: Car[];
};