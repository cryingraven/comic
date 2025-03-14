import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  UpdatedAt,
  CreatedAt,
  HasOne,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Chapter } from './chapter.model';

@Table({
  tableName: 'comics',
})
export class Comic extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  comic_id: number;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  image: string;

  @Column
  cover: string;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @BelongsTo(() => User, 'user_id')
  author: User;

  @HasMany(() => Chapter)
  chapters: Chapter[];

  @Column
  genre: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
