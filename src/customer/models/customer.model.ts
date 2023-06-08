import { Column, DataType, Model, Table } from "sequelize-typescript";

interface CustomerAttr {
    full_name: string;
    phone_number: string;
    email: string;
    hashed_password: string;
    address: string;
}

@Table({ tableName: "customer" })
export class Customer extends Model<Customer, CustomerAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    full_name: string;

    @Column({
        type: DataType.STRING,
        unique: true,
    })
    phone_number: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    hashed_password: string;

    @Column({
        type: DataType.STRING
    })
    address: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    is_active: boolean;

    @Column({
        type: DataType.STRING,
    })
    hashed_refresh_token: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_owner: boolean;
};
