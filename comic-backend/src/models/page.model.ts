import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Comic } from './comic.model';
import { Chapter } from './chapter.model';

@Table({
  tableName: 'pages',
})
export class Page extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  page_id: number;

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
  page_number: number;

  @Column
  image: string;

  @Column
  lang: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
