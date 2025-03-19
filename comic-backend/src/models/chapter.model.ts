import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  Default,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Comic } from './comic.model';

@Table({
  tableName: 'chapters',
})
export class Chapter extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  chapter_id: number;

  @ForeignKey(() => Comic)
  @Column
  comic_id: number;

  @BelongsTo(() => Comic, 'comic_id')
  comic: Comic;

  @Column
  title: string;

  @Column
  subtitle: string;

  @Column
  image: string;

  @Default(0)
  @Column
  likes: number;

  @Default(0)
  @Column
  views: number;

  @Default(0)
  @Column
  shares: number;

  @Default(0)
  @Column
  comments: number;

  @Default(0)
  @Column
  price: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
