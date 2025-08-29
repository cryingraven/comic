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
  HasMany,
} from 'sequelize-typescript';
import { Comic } from './comic.model';
import { TEXT } from 'sequelize';
import { Access } from './access.model';

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
  chapter_no: number | null;

  @Default('published')
  @Column
  status: string | null;

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

  @HasMany(() => Access, 'chapter_id')
  accesses: Access[];

  @Column
  published_at: Date;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
