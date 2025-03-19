import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Access } from 'src/models/access.model';
import { Chapter } from 'src/models/chapter.model';
import { Comic } from 'src/models/comic.model';
import { Payment } from 'src/models/payment.model';
import { PaymentMethod } from 'src/models/paymentmethod.model';
import { User } from 'src/models/user.model';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Access)
    private accessModel: typeof Access,
    @InjectModel(Payment)
    private paymentModel: typeof Payment,
    @InjectModel(PaymentMethod)
    private paymentMethodModel: typeof PaymentMethod,
    @InjectModel(Comic)
    private comicModel: typeof Comic,
    @InjectModel(Chapter)
    private chapterModel: typeof Chapter,
    private readonly sequelize: Sequelize,
  ) {}

  getPaymentMethods() {
    return this.paymentMethodModel.findAll();
  }

  async buyChapterUsingCoin(
    firebaseUid: string,
    comicId: number,
    chapterId: number,
  ) {
    try {
      const result = await this.sequelize.transaction(async (t) => {
        const user = await this.userModel.findOne({
          where: {
            firebase_uid: firebaseUid,
          },
        });

        if (!user) {
          throw new Error('User not found');
        }

        const chapter = await this.chapterModel.findOne({
          where: {
            comic_id: comicId,
            chapter_id: chapterId,
          },
        });

        if (!chapter) {
          throw new Error('Chapter not found');
        }

        const access = await this.accessModel.findOne({
          where: {
            user_id: user.user_id,
            comic_id: comicId,
            chapter_id: chapterId,
          },
        });

        if (access) {
          throw new Error('Chapter already bought');
        }

        if (user.balance < chapter.price) {
          throw new Error('Insufficient balance');
        }
        user.balance -= chapter.price;

        await user.save({
          transaction: t,
        });

        const newAccess = await this.accessModel.create(
          {
            user_id: user.user_id,
            comic_id: comicId,
            chapter_id: chapterId,
            expired_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          },
          {
            transaction: t,
          },
        );

        return newAccess;
      });

      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
