import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Car } from "src/car/models/car.model";
import { Customer } from "src/customer/models/customer.model";

interface OrderAttr {
    start_time: Date;
    finish_time: Date;
    total_amount: number;
}

@Table({ tableName: "order" })
export class Order extends Model<Order, OrderAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Car)
    @Column({
        type: DataType.INTEGER,
    })
    car_id: number;

    @BelongsTo(() => Car)
    car: Car;

    @ForeignKey(() => Customer)
    @Column({
        type: DataType.INTEGER,
    })
    customer_id: number;

    @BelongsTo(() => Customer)
    customer: Customer;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    start_time: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    finish_time: Date;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    total_amount: number;
}