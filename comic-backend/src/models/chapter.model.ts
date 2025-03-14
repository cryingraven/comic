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
  id: number;

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
  price: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
