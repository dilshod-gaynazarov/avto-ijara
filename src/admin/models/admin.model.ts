import { Column, DataType, Model, Table } from "sequelize-typescript";

interface AdminAttr {
    full_name: string;
    email: string;
    phone_number: string;
    birthdate: Date;
    hashed_password: string;
    is_active: boolean;
    is_admin: boolean;
    hashed_refresh_token: string;
};

@Table({ tableName: "admin" })
export class Admin extends Model<Admin, AdminAttr> {
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
        allowNull: false,
        unique: true,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    phone_number: string;

    @Column({
        type: DataType.STRING,
    })
    birthdate: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    hashed_password: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    is_active: boolean;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    is_admin: boolean;

    @Column({
        type: DataType.STRING,
    })
    hashed_refresh_token: string;
};