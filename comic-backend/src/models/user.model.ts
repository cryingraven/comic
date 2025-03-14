import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  NotNull,
  Default,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import { Comic } from './comic.model';

@Table({
  tableName: 'users',
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  user_id: number;

  @Column
  firebase_uid: string;

  @Column
  email: string | null;

  @Column
  phone_number: string | null;

  @Default(0)
  @Column
  balance: number;

  @Column
  image: string | null;

  @Default(false)
  @Column
  is_verified: boolean;

  @Default(false)
  @Column
  is_verified_author: boolean;

  @Default(false)
  @Column
  has_notification: boolean;

  @HasMany(() => Comic)
  comics: Comic[];

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
