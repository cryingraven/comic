import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  CreatedAt,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Chapter } from './chapter.model';
import { Comic } from './comic.model';
import { User } from './user.model';

@Table({
  tableName: 'accesses',
  timestamps: false,
})
export class Access extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  access_id: number;

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

  @Column
  expired_at: Date;
}
