import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Customer } from "src/customer/models/customer.model";

interface WalletAttr {
    customer_id: number;
    type: string;
    card: string;
}

@Table({ tableName: "wallet" })
export class Wallet extends Model<Wallet, WalletAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Customer)
    @Column({
        type: DataType.INTEGER,
    })
    customer_id: number;

    @BelongsTo(() => Customer)
    customer: Customer;

    @Column({
        type: DataType.STRING,
    })
    type: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    card: string;
}