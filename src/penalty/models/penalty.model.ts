import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { AdoptedCar } from "src/adopted_car/models/adopted_car.model";
import { Order } from "src/order/models/order.model";

interface PenaltyAttr {
    penalty_day_price: number;
    penalty_amount: number;
    is_paid_penalty: boolean;
}

@Table({ tableName: "penalty" })
export class Penalty extends Model<Penalty, PenaltyAttr> {
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

    @ForeignKey(() => AdoptedCar)
    @Column({
        type: DataType.INTEGER,
    })
    adopted_car_id: number;

    @BelongsTo(() => AdoptedCar)
    adopted_car: AdoptedCar;

    @Column({
        type: DataType.INTEGER,
    })
    penalty_day_price: number;

    @Column({
        type: DataType.INTEGER,
    })
    penalty_amount: number;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    is_paid_penalty: boolean;
};