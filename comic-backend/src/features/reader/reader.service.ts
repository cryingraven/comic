import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Access } from 'src/models/access.model';
import { Chapter } from 'src/models/chapter.model';
import { Comic } from 'src/models/comic.model';
import { Genre } from 'src/models/genre.model';
import { Page } from 'src/models/page.model';
import { ReadHistory } from 'src/models/readhistory.model';
import { User } from 'src/models/user.model';

@Injectable()
export class ReaderService {
  constructor(
    @InjectModel(User) private user: typeof User,
    @InjectModel(Comic) private comic: typeof Comic,
    @InjectModel(Chapter) private chapter: typeof Chapter,
    @InjectModel(Page) private page: typeof Page,
    @InjectModel(Access) private access: typeof Access,
    @InjectModel(Genre) private genre: typeof Genre,
    @InjectModel(ReadHistory) private readHistory: typeof ReadHistory,
  ) {}

  getAll() {
    return this.user.findAll();
  }

  findComics(
    genre: string | null,
    authorId: string | null,
    skip: number = 0,
    limit: number = 10,
    sort: string | null = 'created_at::desc',
  ) {
    const parsedSort = sort.split('::');
    const filter = {};

    if (genre) {
      filter['genre'] = genre;
    }

    if (authorId) {
      filter['user_id'] = authorId;
    }

    return this.comic.findAll({
      include: [User],
      where: filter,
      offset: parseInt(skip.toString()),
      limit: parseInt(limit.toString()),
      order: [[parsedSort[0], parsedSort[1]]],
    });
  }

  getComicById(id: number) {
    return this.comic.findOne({
      include: [User],
      where: {
        comic_id: id,
      },
    });
  }

  findChapters(
    comicId: number,
    skip: number = 0,
    limit: number = 10,
    sor: string | null = 'created_at::desc',
  ) {
    const parsedSort = sor.split('::');

    return this.chapter.findAll({
      where: {
        comic_id: comicId,
      },
      offset: parseInt(skip.toString()),
      limit: parseInt(limit.toString()),
      order: [[parsedSort[0], parsedSort[1]]],
    });
  }

  async findChaptersWithAccess(
    firebaseUid: string,
    comicId: number,
    skip: number = 0,
    limit: number = 10,
    sor: string | null = 'created_at::desc',
  ) {
    const user = await this.user.findOne({
      where: {
        firebase_uid: firebaseUid,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const parsedSort = sor.split('::');

    return this.chapter.findAll({
      include: [
        {
          model: Access,
          where: {
            user_id: user.user_id,
            comic_id: comicId,
          },
          required: false,
        },
      ],
      where: {
        comic_id: comicId,
      },
      offset: parseInt(skip.toString()),
      limit: parseInt(limit.toString()),
      order: [[parsedSort[0], parsedSort[1]]],
    });
  }

  getChapterById(chapterId: number) {
    return this.chapter.findOne({
      where: {
        chapter_id: chapterId,
      },
    });
  }

  getPages(chapterId: number) {
    return this.page.findAll({
      where: {
        chapter_id: chapterId,
      },
    });
  }

  async findMainGenres() {
    return await this.genre.findAll({
      where: {
        id: {
          [Op.lte]: 8,
        },
      },
    });
  }

  async findAllGenres() {
    return await this.genre.findAll();
  }

  async getPreviousChapter(comicId: number, chapterId: number) {
    return await this.chapter.findOne({
      where: {
        comic_id: comicId,
        chapter_id: {
          [Op.lt]: chapterId,
          [Op.gt]: 0,
        },
      },
      order: [['chapter_id', 'DESC']],
      limit: 1,
    });
  }

  async getNextChapter(comicId: number, chapterId: number) {
    return await this.chapter.findOne({
      where: {
        comic_id: comicId,
        chapter_id: {
          [Op.gt]: chapterId,
        },
      },
      order: [['chapter_id', 'ASC']],
      limit: 1,
    });
  }

  async getAccess(firebaseUid: string, comicId: number, chapterId: number) {
    const user = await this.user.findOne({
      where: {
        firebase_uid: firebaseUid,
      },
    });

    if (!user) {
      return null;
    }

    const userId = user.user_id;

    return await this.access.findOne({
      where: {
        user_id: userId,
        comic_id: comicId,
        chapter_id: chapterId,
        expired_at: {
          [Op.gt]: new Date(),
        },
      },
    });
  }

  async addReadHistory(
    firebaseUid: string,
    comicId: number,
    chapterId: number,
  ) {
    const user = await this.user.findOne({
      where: {
        firebase_uid: firebaseUid,
      },
    });

    if (!user) {
      return null;
    }

    const comic = await this.comic.findOne({
      where: {
        comic_id: comicId,
      },
    });

    if (!comic) {
      return null;
    }

    const chapter = await this.chapter.findOne({
      where: {
        chapter_id: chapterId,
      },
    });

    if (!chapter) {
      return null;
    }

    comic.views += 1;
    await comic.save();

    chapter.views += 1;
    await chapter.save();

    const userId = user.user_id;
    const readHistory = await this.readHistory.findOne({
      where: {
        user_id: userId,
      },
      limit: 1,
      order: [['created_at', 'DESC']],
    });

    if (readHistory) {
      return readHistory;
    } else {
      return await this.readHistory.create({
        user_id: userId,
        comic_id: comicId,
        chapter_id: chapterId,
        created_at: new Date(),
      });
    }
  }
}
