import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Order } from "src/order/models/order.model";

interface AdoptedCarAttr {
    adopted_date: Date;
    is_adopted: boolean;
}

@Table({ tableName: "adopted_car" })
export class AdoptedCar extends Model<AdoptedCar, AdoptedCarAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Order)
    @Column({
        type: DataType.INTEGER,
    })
    order_id: number;

    @BelongsTo(() => Order)
    order: Order;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    adopted_date: Date;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    is_adopted: boolean;
}