import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Chapter } from './chapter.model';
import { User } from './user.model';
import { TEXT } from 'sequelize';

@Table({
  tableName: 'comments',
  timestamps: false,
})
export class Comments extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  comment_id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;
  @ForeignKey(() => Chapter)
  @Column
  chapter_id: number;

  @Column(TEXT('long'))
  content: string;

  @Column
  created_at: Date;

  @Column
  updated_at: Date;
  @BelongsTo(() => User)
  user: User;
  @BelongsTo(() => Chapter)
  chapter: Chapter;
}

export default Comments;
