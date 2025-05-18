import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'banks',
  timestamps: true,
})
export class Bank extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  bank_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  code: string;
}

export default Bank;
