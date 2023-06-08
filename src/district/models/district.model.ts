import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Region } from "src/region/models/region.model";

interface DistrictAttr {
    name: string;
}

@Table({ tableName: "district" })
export class District extends Model<District, DistrictAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Region)
    @Column({
        type: DataType.INTEGER,
    })
    region_id: number;

    @BelongsTo(() => Region)
    region: Region;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;
};