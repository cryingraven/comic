import { TEXT } from 'sequelize';
import {
  AutoIncrement,
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'blogs',
})
export class Blog extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  blog_id: number;

  @Column
  title: string;

  @Column(TEXT('long'))
  content: string;

  @Column
  author: string;

  @Column
  image: string;
  
  @Column
  tags: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
