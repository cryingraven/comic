import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'packages',
  timestamps: false,
})
export class Package extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  package_id: number;

  @Column
  name: string;

  @Column
  price: number;

  @Column
  coin: number;

  @Column
  discount: string;
}
