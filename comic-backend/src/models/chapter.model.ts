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
import { TEXT } from 'sequelize';

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

  @Column(TEXT('long'))
  title: string;

  @Column(TEXT('long'))
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

  @Default(0)
  @Column
  fiat_price: number;

  @Column
  published_at: Date;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
