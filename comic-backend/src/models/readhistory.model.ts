import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Comic } from './comic.model';
import { Chapter } from './chapter.model';

@Table({
  tableName: 'read_histories',
})
export class ReadHistory extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  history_id: number;

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

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
