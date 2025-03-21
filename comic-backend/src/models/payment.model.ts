import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  CreatedAt,
  ForeignKey,
  BelongsTo,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from './user.model';
import { PaymentMethod } from './paymentmethod.model';
import { TEXT } from 'sequelize';

@Table({
  tableName: 'payments',
  timestamps: false,
})
export class Payment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  payment_id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @ForeignKey(() => PaymentMethod)
  @Column
  payment_method_id: number;

  @BelongsTo(() => PaymentMethod, 'payment_method_id')
  payment_method: PaymentMethod;

  @Column
  type: string;

  @Column
  amount: number;

  @Column
  status: string;

  @Column
  amount_to_add: number | null;

  @Column(TEXT('long'))
  payment_response: string;

  @Column(TEXT('long'))
  extra: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
