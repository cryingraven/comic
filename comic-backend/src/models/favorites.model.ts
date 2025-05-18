import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Comic } from './comic.model';
import { User } from './user.model';
import { Chapter } from './chapter.model';

@Table({
  tableName: 'favorites',
  timestamps: false,
})
export class Favorites extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  favorite_id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => Chapter)
  @Column
  chapter_id: number;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @BelongsTo(() => Chapter, 'comic_id')
  chapter: Comic;
}
