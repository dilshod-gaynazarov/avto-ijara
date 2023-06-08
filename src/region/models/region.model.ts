import { Column, Model, Table, DataType, HasMany } from "sequelize-typescript";
import { District } from "src/district/models/district.model";

interface RegionAttr {
    name: string;
}

@Table({ tableName: "region" })
export class Region extends Model<Region, RegionAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING
    })
    name: string;

    @HasMany(() => District)
    districts: District[];
};