import { AutoIncrement, Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";


@Table({
    tableName: 'banners',
})
export class Banner extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    banner_id: number;

    @Column
    name: string;
    @Column
    image: string;

    @Column
    url: string;

    @Column
    position: string;

    @Column
    start_date: Date;
    
    @Column
    end_date: Date;
    
    @Column
    status: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;
}