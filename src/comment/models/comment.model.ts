import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Car } from "src/car/models/car.model";
import { Customer } from "src/customer/models/customer.model";

interface CommentAttr {
    impression: string;
}

@Table({ tableName: "comment" })
export class Comment extends Model<Comment, CommentAttr> {
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
        type: DataType.TEXT,
    })
    impression: string;
}