import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Sequelize } from 'sequelize';
import { Access } from 'src/models/access.model';
import { Chapter } from 'src/models/chapter.model';
import { Comic } from 'src/models/comic.model';
import Comments from 'src/models/comments.model';
import { Favorites } from 'src/models/favorites.model';
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
    @InjectModel(Favorites) private favorites: typeof Favorites,
    @InjectModel(Comments) private comments: typeof Comments,
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
    search: string | null | undefined = null,
  ) {
    const parsedSort = sort.split('::');
    const filter = {};

    if (genre) {
      filter[Op.or] = [
        {
          genre: genre,
        },
        {
          subgenres: {
            [Op.like]: `%${genre}%`,
          },
        },
      ];
    }

    if (authorId) {
      filter['user_id'] = authorId;
    }

    if (search) {
      filter['title'] = {
        [Op.like]: `%${search}%`,
      };
    }

    filter['status'] = {
      [Op.ne]: 'unpublished',
    };

    filter['published_at'] = {
      [Op.or]: {
        [Op.eq]: null,
        [Op.lte]: new Date(),
      },
    };

    if (parsedSort.length === 2) {
      return this.comic.findAll({
        include: [User],
        where: filter,
        offset: parseInt(skip.toString()),
        limit: parseInt(limit.toString()),
        order: [[parsedSort[0], parsedSort[1]]],
      });
    } else {
      if (parsedSort[0] === 'random') {
        return this.comic.findAll({
          include: [User],
          where: filter,
          order: Sequelize.literal('rand()'),
          offset: parseInt(skip.toString()),
          limit: parseInt(limit.toString()),
        });
      } else {
        return this.comic.findAll({
          include: [User],
          where: filter,
          offset: parseInt(skip.toString()),
          limit: parseInt(limit.toString()),
        });
      }
    }
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

    const userId = user.user_id;
    const readHistory = await this.readHistory.findOne({
      where: {
        user_id: userId,
        comic_id: comicId,
        chapter_id: chapterId,
      },
      limit: 1,
      order: [['created_at', 'DESC']],
    });

    if (readHistory) {
      return readHistory;
    } else {
      comic.views += 1;
      await comic.save();

      chapter.views += 1;
      await chapter.save();

      return await this.readHistory.create({
        user_id: userId,
        comic_id: comicId,
        chapter_id: chapterId,
        created_at: new Date(),
      });
    }
  }

  async getFavoriteStatus(firebaseUid: string, chapterId: number) {
    const favorites = await this.favorites.findOne({
      include: [
        {
          model: User,
          as: 'user',
          where: {
            firebase_uid: firebaseUid,
          },
        },
      ],
      where: {
        chapter_id: chapterId,
      },
    });

    return favorites ? true : false;
  }

  async toggleFavorite(firebaseUid: string, chapterId: number) {
    const user = await this.user.findOne({
      where: {
        firebase_uid: firebaseUid,
      },
    });

    if (!user) {
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

    const userId = user.user_id;
    const favorites = await this.favorites.findOne({
      where: {
        user_id: userId,
        chapter_id: chapterId,
      },
    });

    if (favorites) {
      await favorites.destroy();
      chapter.likes -= 1;
      await chapter.save();
      return false;
    } else {
      await this.favorites.create({
        user_id: userId,
        chapter_id: chapterId,
      });

      chapter.likes += 1;
      await chapter.save();

      return true;
    }
  }

  async getChapterComments(chapterId: number, skip: number, limit: number) {
    return await this.comments.findAll({
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
      where: {
        chapter_id: chapterId,
      },
      order: [['created_at', 'DESC']],
      offset: skip,
      limit: limit,
    });
  }

  async addChapterComment(
    firebaseUid: string,
    chapterId: number,
    content: string,
  ) {
    const user = await this.user.findOne({
      where: {
        firebase_uid: firebaseUid,
      },
    });

    if (!user) {
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

    const userId = user.user_id;

    const comment = await this.comments.create({
      user_id: userId,
      chapter_id: chapterId,
      content: content,
      created_at: new Date(),
    });

    chapter.comments += 1;
    await chapter.save();

    return comment;
  }

  async deleteComment(firebaseUid: string, commentId: number) {
    const user = await this.user.findOne({
      where: {
        firebase_uid: firebaseUid,
      },
    });

    const comment = await this.comments.findOne({
      where: {
        comment_id: commentId,
      },
    });

    if (!comment) {
      return null;
    }

    if (comment.user_id !== user.user_id) {
      return null;
    }

    const chapter = await this.chapter.findOne({
      where: {
        chapter_id: comment.chapter_id,
      },
    });
    chapter.comments -= 1;
    await chapter.save();

    await comment.destroy();
    return comment;
  }
}
