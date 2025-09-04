import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cache } from 'cache-manager';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Access } from 'src/models/access.model';
import { Chapter } from 'src/models/chapter.model';
import { Comic } from 'src/models/comic.model';
import Comments from 'src/models/comments.model';
import { Favorites } from 'src/models/favorites.model';
import { Genre } from 'src/models/genre.model';
import { Page } from 'src/models/page.model';
import { ReadHistory } from 'src/models/readhistory.model';
import { InternalTransaction } from 'src/models/transaction.model';
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
    @InjectModel(InternalTransaction)
    private transaction: typeof InternalTransaction,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly sequelize: Sequelize,
  ) {}

  async getAll() {
    return this.cacheManager.wrap('all_users', () => this.user.findAll());
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

    const cacheKey = `comics_${genre}_${authorId}_${skip}_${limit}_${sort}_${search}`;

    if (parsedSort.length === 2) {
      return this.cacheManager.wrap(cacheKey, () =>
        this.comic.findAll({
          include: [User],
          where: filter,
          offset: parseInt(skip.toString()),
          limit: parseInt(limit.toString()),
          order: [[parsedSort[0], parsedSort[1]]],
        }),
      );
    } else {
      if (parsedSort[0] === 'random') {
        return this.cacheManager.wrap(cacheKey, () =>
          this.comic.findAll({
            include: [User],
            where: filter,
            order: Sequelize.literal('rand()'),
            offset: parseInt(skip.toString()),
            limit: parseInt(limit.toString()),
          }),
        );
      } else {
        return this.cacheManager.wrap(cacheKey, () =>
          this.comic.findAll({
            include: [User],
            where: filter,
            offset: parseInt(skip.toString()),
            limit: parseInt(limit.toString()),
          }),
        );
      }
    }
  }

  async countComics(
    genre: string | null,
    authorId: string | null,
    search: string | null | undefined = null,
  ) {
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

    const cacheKey = `count_comics_${genre}_${authorId}_${search}`;

    return this.cacheManager.wrap(cacheKey, () =>
      this.comic.count({
        where: filter,
      }),
    );
  }

  getComicById(id: number) {
    return this.cacheManager.wrap(`comic_${id}`, () =>
      this.comic.findOne({
        include: [User],
        where: {
          comic_id: id,
        },
      }),
    );
  }

  findChapters(
    comicId: number,
    skip: number = 0,
    limit: number = 10,
    sor: string | null = 'created_at::desc',
  ) {
    const parsedSort = sor.split('::');
    const cacheKey = `chapters_${comicId}_${skip}_${limit}_${sor}`;

    return this.cacheManager.wrap(cacheKey, () =>
      this.chapter.findAll({
        include: [
          {
            model: Comic,
            where: {
              comic_id: comicId,
            },
          },
        ],
        where: {
          comic_id: comicId,
          published_at: {
            [Op.ne]: null,
          },
        },
        offset: parseInt(skip.toString()),
        limit: parseInt(limit.toString()),
        order: [
          [parsedSort[0], parsedSort[1]],
          ['chapter_no', parsedSort[1]],
        ],
      }),
    );
  }

  async countChapters(comicId: number) {
    const cacheKey = `count_chapters_${comicId}`;

    return this.cacheManager.wrap(cacheKey, () =>
      this.chapter.count({
        where: {
          comic_id: comicId,
          published_at: {
            [Op.ne]: null,
          },
        },
      }),
    );
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
    const cacheKey = `chapters_with_access_${firebaseUid}_${comicId}_${skip}_${limit}_${sor}`;

    return this.cacheManager.wrap(cacheKey, () =>
      this.chapter.findAll({
        include: [
          {
            model: Access,
            where: {
              user_id: user.user_id,
              comic_id: comicId,
            },
            required: false,
          },
          {
            model: Comic,
            where: {
              comic_id: comicId,
            },
          },
        ],
        where: {
          comic_id: comicId,
          published_at: {
            [Op.ne]: null,
          },
        },
        offset: parseInt(skip.toString()),
        limit: parseInt(limit.toString()),
        order: [
          [parsedSort[0], parsedSort[1]],
          ['chapter_no', parsedSort[1]],
        ],
      }),
    );
  }

  getChapterById(chapterId: number) {
    return this.cacheManager.wrap(`chapter_${chapterId}`, () =>
      this.chapter.findOne({
        where: {
          chapter_id: chapterId,
        },
      }),
    );
  }

  async getChapterByIdWithAccess(chapterId: number, firebaseUid: string) {
    const user = await this.user.findOne({
      where: {
        firebase_uid: firebaseUid,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }
    return this.cacheManager.wrap(`chapter_${chapterId}-${firebaseUid}`, () =>
      this.chapter.findOne({
        include: [
          {
            model: Access,
            where: {
              user_id: user.user_id,
            },
            required: false,
          },
          {
            model: Comic,
          },
        ],
        where: {
          chapter_id: chapterId,
        },
      }),
    );
  }

  getPages(chapterId: number) {
    return this.cacheManager.wrap(`pages_${chapterId}`, () =>
      this.page.findAll({
        where: {
          chapter_id: chapterId,
        },
      }),
    );
  }

  async findMainGenres() {
    return await this.cacheManager.wrap('main_genres', () =>
      this.genre.findAll({
        where: {
          id: {
            [Op.lte]: 8,
          },
        },
      }),
    );
  }

  async findAllGenres() {
    return await this.cacheManager.wrap('all_genres', () =>
      this.genre.findAll(),
    );
  }

  async getPreviousChapter(comicId: number, chapterId: number) {
    const cacheKey = `previous_chapter_${comicId}_${chapterId}`;
    return await this.cacheManager.wrap(cacheKey, () =>
      this.chapter.findOne({
        where: {
          comic_id: comicId,
          chapter_id: {
            [Op.lt]: chapterId,
            [Op.gt]: 0,
          },
        },
        order: [['chapter_id', 'DESC']],
        limit: 1,
      }),
    );
  }

  async getNextChapter(comicId: number, chapterId: number) {
    const cacheKey = `next_chapter_${comicId}_${chapterId}`;
    return await this.cacheManager.wrap(cacheKey, () =>
      this.chapter.findOne({
        where: {
          comic_id: comicId,
          chapter_id: {
            [Op.gt]: chapterId,
          },
        },
        order: [['chapter_id', 'ASC']],
        limit: 1,
      }),
    );
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
    const cacheKey = `access_${userId}_${comicId}_${chapterId}`;

    return await this.cacheManager.wrap(cacheKey, () =>
      this.access.findOne({
        where: {
          user_id: userId,
          comic_id: comicId,
          chapter_id: chapterId,
          expired_at: {
            [Op.gt]: new Date(),
          },
        },
      }),
    );
  }

  async addAnonymousReadHistory(comicId: number, chapterId: number) {
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
    const result = await this.sequelize.transaction(async (t) => {
      const author = await this.user.findOne({
        where: {
          user_id: comic.user_id,
        },
      });

      author.wallet_balance += 2.5;

      await author.save({
        transaction: t,
      });

      comic.views += 1;
      await comic.save({
        transaction: t,
      });

      chapter.views += 1;
      await chapter.save({
        transaction: t,
      });

      await this.transaction.create(
        {
          user_id: comic.user_id,
          comic_id: chapter.comic_id,
          chapter_id: chapter.chapter_id,
          amount: 2.5,
          type: 'sell-comic',
          status: 'success',
        },
        {
          transaction: t,
        },
      );

      return null;
    });

    return result;
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
      const result = await this.sequelize.transaction(async (t) => {
        const author = await this.user.findOne({
          where: {
            user_id: comic.user_id,
          },
        });

        author.wallet_balance += chapter.fiat_price;

        await author.save({
          transaction: t,
        });

        comic.views += 1;
        await comic.save({
          transaction: t,
        });

        chapter.views += 1;
        await chapter.save({
          transaction: t,
        });

        const read = await this.readHistory.create({
          user_id: userId,
          comic_id: comicId,
          chapter_id: chapterId,
          created_at: new Date(),
        });

        await this.transaction.create(
          {
            user_id: comic.user_id,
            comic_id: chapter.comic_id,
            chapter_id: chapter.chapter_id,
            amount: 2.5,
            type: 'sell-comic',
            status: 'success',
          },
          {
            transaction: t,
          },
        );

        return read;
      });

      return result;
    }
  }

  async getFavoriteStatus(firebaseUid: string, chapterId: number) {
    const cacheKey = `favorite_status_${firebaseUid}_${chapterId}`;
    return this.cacheManager.wrap(cacheKey, async () => {
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
    });
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
    const cacheKey = `chapter_comments_${chapterId}_${skip}_${limit}`;
    return await this.cacheManager.wrap(cacheKey, () =>
      this.comments.findAll({
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
      }),
    );
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
