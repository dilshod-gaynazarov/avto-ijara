import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Customer } from "src/customer/models/customer.model";
import { Order } from "src/order/models/order.model";
import { Wallet } from "src/wallet/models/wallet.model";

interface PaymentAttr {
    wallet_id: number;
    payment_date: Date;
    payment_status: boolean;
}

@Table({ tableName: "payment" })
export class Payment extends Model<Payment, PaymentAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Order)
    @Column({
        type: DataType.INTEGER
    })
    order_id: number;

    @BelongsTo(() => Order)
    order: Order;

    @ForeignKey(() => Customer)
    @Column({
        type: DataType.INTEGER,
    })
    customer_id: number;

    @BelongsTo(() => Customer)
    customer: Customer;

    @ForeignKey(() => Wallet)
    @Column({
        type: DataType.INTEGER,
    })
    wallet_id: number;

    @BelongsTo(() => Wallet)
    wallet: Wallet;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    payment_date: Date;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    payment_status: boolean;
}