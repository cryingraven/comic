import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Comic } from './comic.model';
import { Chapter } from './chapter.model';

@Table({
  tableName: 'transactions',
})
export class InternalTransaction extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  transaction_id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @ForeignKey(() => Comic)
  @Column
  comic_id: number;

  @BelongsTo(() => Comic, 'comic_id')
  comic: Comic;

  @ForeignKey(() => Chapter)
  @Column
  chapter_id: number;

  @BelongsTo(() => Chapter, 'chapter_id')
  chapter: Chapter;

  @Column
  amount: number;

  @Column
  type: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @Column
  status: string;
}
