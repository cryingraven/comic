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
  Default,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Chapter } from './chapter.model';
import { TEXT } from 'sequelize';

@Table({
  tableName: 'comics',
})
export class Comic extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  comic_id: number;

  @Column(TEXT('long'))
  title: string;

  @Column(TEXT('long'))
  description: string;

  @Column
  image: string;

  @Column
  cover: string;

  @Column
  banner: string;

  @Column
  comic_type: string;

  @Column
  status: string;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @BelongsTo(() => User, 'user_id')
  author: User;

  @HasMany(() => Chapter)
  chapters: Chapter[];

  @Column
  genre: string;

  @Default(0)
  @Column
  views: number;

  @Default(0)
  @Column
  subscribers: number;

  @Default(0)
  @Column
  likes: number;

  @Default(0)
  @Column
  shares: number;

  @Default(0)
  @Column
  comments: number;

  @Default(false)
  @Column
  is_editor_choice: boolean;

  @Column
  published_at: Date;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
