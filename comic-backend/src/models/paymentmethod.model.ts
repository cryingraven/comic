import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'payment_methods',
})
export class PaymentMethod extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  method_id: number;

  @Column
  method_name: string;

  @Column
  method_type: string;

  @Column
  method_description: string;

  @Column
  method_image: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
