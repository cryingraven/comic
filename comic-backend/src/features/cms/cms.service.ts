import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { generateKeyPairSync } from 'crypto';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { EditComicDTO, SaveChapterDTO, SaveComicDTO } from 'src/dto/cms.dto';
import Bank from 'src/models/bank.model';
import { Chapter } from 'src/models/chapter.model';
import { Comic } from 'src/models/comic.model';
import { Genre } from 'src/models/genre.model';
import { Page } from 'src/models/page.model';
import { ReadHistory } from 'src/models/readhistory.model';
import { InternalTransaction } from 'src/models/transaction.model';
import { User } from 'src/models/user.model';
import UserBankAccount from 'src/models/userbankaccount.model';

@Injectable()
export default class CMSService {
  constructor(
    @InjectModel(Comic)
    private comicModel: typeof Comic,
    @InjectModel(Chapter)
    private chapterModel: typeof Chapter,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Genre)
    private genreModel: typeof Genre,
    @InjectModel(Page)
    private pageModel: typeof Page,
    @InjectModel(InternalTransaction)
    private transactionModel: typeof InternalTransaction,
    @InjectModel(Bank)
    private bankModel: typeof Bank,
    @InjectModel(UserBankAccount)
    private userBankAccountModel: typeof UserBankAccount,
    @InjectModel(ReadHistory)
    private readHistoryModel: typeof ReadHistory,
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
      RIGHT JOIN
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

  async getAllGenresForInput() {
    const genres = await this.genreModel.findAll({
      where: {
        id: {
          [Op.ne]: 27,
        },
      },
    });

    return genres;
  }

  async createComic(comic: SaveComicDTO, userId: string) {
    const checkComicTitle = await this.comicModel.findOne({
      where: {
        title: comic.title,
      },
    });

    if (checkComicTitle) {
      throw new Error('Comic title already exists');
    }

    const profileAuthor = await this.userModel.findOne({
      where: {
        firebase_uid: userId,
      },
    });

    if (!profileAuthor) {
      throw new Error('User not found');
    }

    const newComic = new Comic();
    newComic.title = comic.title;
    newComic.description = comic.description;
    newComic.genre = comic.genre;
    newComic.comic_type = comic.type;
    newComic.subgenres = comic.subgenres.join(', ');
    newComic.published_at = comic.published_at;
    newComic.cover = comic.cover;
    newComic.image = comic.image;
    newComic.banner = comic.banner;
    newComic.user_id = profileAuthor.user_id;
    newComic.status = 'on-going';

    const savedComic = await newComic.save();

    return savedComic;
  }

  async createChapter(chapter: SaveChapterDTO, userId: string) {
    const checkChapterTitle = await this.chapterModel.findOne({
      where: {
        title: chapter.title,
        comic_id: chapter.comic_id,
      },
    });

    if (checkChapterTitle) {
      throw new Error('Chapter title already exists');
    }

    const checkComic = await this.comicModel.findOne({
      where: {
        comic_id: chapter.comic_id,
      },
    });

    if (!checkComic) {
      throw new Error('Comic not found');
    }

    const profileAuthor = await this.userModel.findOne({
      where: {
        firebase_uid: userId,
      },
    });

    if (!profileAuthor) {
      throw new Error('User not found');
    }

    const newChapter = new Chapter();
    newChapter.title = chapter.title;
    newChapter.subtitle = chapter.subtitle;
    newChapter.image = chapter.image;
    newChapter.price = chapter.price;
    newChapter.fiat_price = chapter.fiat_price;
    newChapter.published_at = chapter.published_at;
    newChapter.comic_id = chapter.comic_id;

    const savedChapter = await newChapter.save();

    for (const page of chapter.pages) {
      const newPage = new Page();
      newPage.image = page;
      newPage.chapter_id = savedChapter.chapter_id;
      newPage.comic_id = chapter.comic_id;
      newPage.lang = 'id';
      await newPage.save();
    }

    return savedChapter;
  }

  async updateComic(comic: EditComicDTO, comicId: number, userId: string) {
    const checkComic = await this.comicModel.findOne({
      where: {
        comic_id: comicId,
      },
    });

    if (!checkComic) {
      throw new Error('Comic not found');
    }

    const authorComic = await this.userModel.findOne({
      where: {
        firebase_uid: userId,
      },
    });

    if (!authorComic) {
      throw new Error('User not found');
    }

    if (authorComic.user_id !== checkComic.user_id) {
      throw new Error('You are not the author of this comic');
    }

    const updatedComic = checkComic;

    updatedComic.title = comic.title;
    updatedComic.description = comic.description;
    updatedComic.genre = comic.genre;
    updatedComic.comic_type = comic.type;
    updatedComic.subgenres = comic.subgenres.join(', ');
    updatedComic.published_at = comic.published_at;
    updatedComic.cover = comic.cover;
    updatedComic.image = comic.image;
    updatedComic.banner = comic.banner;
    await updatedComic.save();

    return updatedComic;
  }

  async updateChapter(
    chapter: SaveChapterDTO,
    chapterId: number,
    userId: string,
  ) {
    const checkChapter = await this.chapterModel.findOne({
      where: {
        chapter_id: chapterId,
      },
    });

    if (!checkChapter) {
      throw new Error('Chapter not found');
    }

    const checkComic = await this.comicModel.findOne({
      where: {
        comic_id: chapter.comic_id,
      },
    });

    if (!checkComic) {
      throw new Error('Comic not found');
    }

    if (checkChapter.comic_id !== chapter.comic_id) {
      throw new Error('Chapter does not belong to this comic');
    }

    const profileAuthor = await this.userModel.findOne({
      where: {
        firebase_uid: userId,
      },
    });

    if (!profileAuthor) {
      throw new Error('User not found');
    }

    if (profileAuthor.user_id !== checkComic.user_id) {
      throw new Error('You are not the author of this comic');
    }

    const updatedChapter = checkChapter;
    updatedChapter.title = chapter.title;
    updatedChapter.subtitle = chapter.subtitle;
    updatedChapter.image = chapter.image;
    updatedChapter.price = chapter.price;
    updatedChapter.fiat_price = chapter.fiat_price;
    updatedChapter.published_at = chapter.published_at;
    await updatedChapter.save();

    const checkPages = await this.pageModel.findAll({
      where: {
        chapter_id: chapterId,
      },
    });

    for (const page of checkPages) {
      await page.destroy();
    }

    for (const page of chapter.pages) {
      const newPage = new Page();
      newPage.image = page;
      newPage.chapter_id = chapterId;
      newPage.comic_id = chapter.comic_id;
      newPage.lang = 'id';
      await newPage.save();
    }

    return updatedChapter;
  }

  async getComicById(comicId: number) {
    const comic = await this.comicModel.findOne({
      where: {
        comic_id: comicId,
      },
    });

    if (!comic) {
      throw new Error('Comic not found');
    }

    return comic;
  }

  async getChapterById(chapterId: number) {
    const chapter = await this.chapterModel.findOne({
      where: {
        chapter_id: chapterId,
      },
    });

    if (!chapter) {
      throw new Error('Chapter not found');
    }

    return chapter;
  }

  async getChapterPages(chapterId: number) {
    const pages = await this.pageModel.findAll({
      where: {
        chapter_id: chapterId,
      },
    });
    return pages;
  }

  async unPublishComic(comicId: number, userId: string) {
    const checkComic = await this.comicModel.findOne({
      where: {
        comic_id: comicId,
      },
    });
    if (!checkComic) {
      throw new Error('Comic not found');
    }

    const profileAuthor = await this.userModel.findOne({
      where: {
        firebase_uid: userId,
      },
    });

    if (!profileAuthor) {
      throw new Error('User not found');
    }

    if (profileAuthor.user_id !== checkComic.user_id) {
      throw new Error('You are not the author of this comic');
    }
    const unpublishedComic = checkComic;
    unpublishedComic.published_at = null;
    unpublishedComic.status = 'unpublished';
    await unpublishedComic.save();
    return unpublishedComic;
  }

  async getAuthorWalletBalanceTransaction(
    userId: string,
    startDate: Date,
    endDate: Date,
    skip: number = 0,
    limit: number = 10,
  ) {
    const transactions = await this.transactionModel.findAll({
      include: [
        {
          model: Comic,
          as: 'comic',
        },
        {
          model: User,
          as: 'user',
          where: {
            firebase_uid: userId,
          },
        },
      ],
      where: {
        created_at: {
          [Op.between]: [startDate, endDate],
        },
        type: {
          [Op.in]: ['sell-comic', 'donation', 'withdraw'],
        },
      },
      offset: skip,
      limit: limit,
      order: [['created_at', 'DESC']],
    });

    return transactions;
  }

  async getAllBanks() {
    const banks = await this.bankModel.findAll();
    return banks;
  }

  async getNumberOfComicsByAuthor(userId: number) {
    const numberOfComics = await this.comicModel.count({
      where: {
        user_id: userId,
      },
    });
    return numberOfComics;
  }

  async getLast30DaysTotalRevenueByAuthor(userId: number) {
    const totalRevenue = await this.transactionModel.sum('amount', {
      where: {
        created_at: {
          [Op.between]: [
            new Date(new Date().setDate(new Date().getDate() - 30)),
            new Date(),
          ],
        },
        user_id: userId,
        type: {
          [Op.in]: ['sell-comic'],
        },
      },
    });

    return totalRevenue;
  }

  async getLast30DaysDonationByAuthor(userId: number) {
    const totalDonation = await this.transactionModel.sum('amount', {
      where: {
        created_at: {
          [Op.between]: [
            new Date(new Date().setDate(new Date().getDate() - 30)),
            new Date(),
          ],
        },
        user_id: userId,
        type: {
          [Op.in]: ['donation'],
        },
      },
    });

    return totalDonation;
  }

  async getTotalViews30DysByAuthor(userId: number) {
    const totalViews = await this.readHistoryModel.count({
      include: [
        {
          model: Comic,
          as: 'comic',
          where: {
            user_id: userId,
          },
        },
      ],
      where: {
        created_at: {
          [Op.between]: [
            new Date(new Date().setDate(new Date().getDate() - 30)),
            new Date(),
          ],
        },
      },
    });
    return totalViews;
  }

  async getDashboardStatsCountByFirebaseUid(userId: string) {
    const user = await this.userModel.findOne({
      where: {
        firebase_uid: userId,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const numberOfComics = await this.getNumberOfComicsByAuthor(user.user_id);
    const totalRevenue = await this.getLast30DaysTotalRevenueByAuthor(
      user.user_id,
    );
    const totalDonation = await this.getLast30DaysDonationByAuthor(
      user.user_id,
    );
    const totalViews = await this.getTotalViews30DysByAuthor(user.user_id);

    return {
      num_of_comics: numberOfComics,
      total_revenue: totalRevenue,
      total_donation: totalDonation,
      total_views: totalViews,
    };
  }

  async publishComic(comicId: number, userId: string) {
    const checkComic = await this.comicModel.findOne({
      where: {
        comic_id: comicId,
      },
    });

    if (!checkComic) {
      throw new Error('Comic not found');
    }

    const profileAuthor = await this.userModel.findOne({
      where: {
        firebase_uid: userId,
      },
    });

    if (!profileAuthor) {
      throw new Error('User not found');
    }

    if (profileAuthor.user_id !== checkComic.user_id) {
      throw new Error('You are not the author of this comic');
    }

    const publishedComic = checkComic;
    publishedComic.published_at = new Date();
    publishedComic.status = 'on-going';
    await publishedComic.save();

    return publishedComic;
  }

  async deleteComicAndAllData(comicId: number, userId: string) {
    const checkComic = await this.comicModel.findOne({
      where: {
        comic_id: comicId,
      },
    });

    if (!checkComic) {
      throw new Error('Comic not found');
    }

    const profileAuthor = await this.userModel.findOne({
      where: {
        firebase_uid: userId,
      },
    });

    if (!profileAuthor) {
      throw new Error('User not found');
    }

    if (profileAuthor.user_id !== checkComic.user_id) {
      throw new Error('You are not the author of this comic');
    }

    // Delete all chapters and pages associated with the comic
    const chapters = await this.chapterModel.findAll({
      where: {
        comic_id: comicId,
      },
    });

    for (const chapter of chapters) {
      await this.sequelize.query(
        'DELETE FROM comments WHERE chapter_id = :chapterId',
        {
          replacements: { chapterId: chapter.chapter_id },
        },
      );
      await this.sequelize.query(
        'DELETE FROM read_histories WHERE chapter_id = :chapterId',
        {
          replacements: { chapterId: chapter.chapter_id },
        },
      );
      await this.sequelize.query(
        'DELETE FROM favorites WHERE chapter_id = :chapterId',
        {
          replacements: { chapterId: chapter.chapter_id },
        },
      );
      await this.sequelize.query(
        'DELETE FROM pages WHERE chapter_id = :chapterId',
        {
          replacements: { chapterId: chapter.chapter_id },
        },
      );

      await chapter.destroy();
    }

    // Delete the comic itself
    await checkComic.destroy();

    return { message: 'Comic and all associated data deleted successfully' };
  }
}
