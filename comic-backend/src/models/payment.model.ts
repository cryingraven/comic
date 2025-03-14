import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  CreatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.model';
import { PaymentMethod } from './paymentmethod.model';

@Table({
  tableName: 'payments',
  timestamps: false,
})
export class Payment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

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
  amoun_to_add: number | null;

  @CreatedAt
  created_at: Date;
}
