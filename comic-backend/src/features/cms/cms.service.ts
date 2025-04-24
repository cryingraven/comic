import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Chapter } from 'src/models/chapter.model';
import { Comic } from 'src/models/comic.model';
import { User } from 'src/models/user.model';

@Injectable()
export default class CMSService {
  constructor(
    @InjectModel(Comic)
    private comicModel: typeof Comic,
    @InjectModel(Chapter)
    private chapterModel: typeof Chapter,
    @InjectModel(User)
    private userModel: typeof User,
    private sequelize: Sequelize,
  ) {}

  async getComicsByAuthorFirebaseId(
    authorFirebaseId: string,
    skip: number,
    limit: number,
  ) {
    const [results, metadata] = await this.sequelize.query(
      `
      SELECT
        c.*,
        COUNT(ch.chapter_id) AS total_chapters
      FROM
        chapters as ch
      LEFT JOIN
        comics as c ON c.comic_id = ch.comic_id
      LEFT JOIN
        users as u ON c.user_id = u.user_id
      WHERE
        u.firebase_uid = :authorFirebaseId
      GROUP BY
        c.comic_id
      ORDER BY
        c.created_at DESC
      LIMIT :limit OFFSET :skip
    `,
      {
        replacements: {
          authorFirebaseId,
          skip: parseInt(skip.toString()),
          limit: parseInt(limit.toString()),
        },
      },
    );

    return results;
  }

  async getChaptersByComicId(comicId: number, skip: number, limit: number) {
    const result = await this.chapterModel.findAndCountAll({
      where: {
        comic_id: comicId,
      },
      limit: parseInt(limit.toString()),
      offset: parseInt(skip.toString()),
      order: [['created_at', 'DESC']],
    });

    return result;
  }
}
