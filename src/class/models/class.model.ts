import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Car } from "src/car/models/car.model";

interface ClassAttr {
    name: string;
}

@Table({ tableName: "class" })
export class Class extends Model<Class, ClassAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
    })
    name: string;

    @HasMany(() => Car)
    cars: Car[];
};
