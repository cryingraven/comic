import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'user_bank_accounts',
  timestamps: true,
})
export class UserBankAccount extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  account_id: number;

  @Column
  user_id: number;
  @Column
  bank_id: number;
  @Column
  account_number: string;
  @Column
  account_name: string;
}

export default UserBankAccount;
