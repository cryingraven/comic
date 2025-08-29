import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cache } from 'cache-manager';
import { Sequelize } from 'sequelize-typescript';
import { Access } from 'src/models/access.model';
import { Chapter } from 'src/models/chapter.model';
import { Comic } from 'src/models/comic.model';
import { Package } from 'src/models/package.model';
import { Payment } from 'src/models/payment.model';
import { PaymentMethod } from 'src/models/paymentmethod.model';
import { InternalTransaction } from 'src/models/transaction.model';
import { User } from 'src/models/user.model';
import { MidtransService } from 'src/services/midtrans.service';

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
    @InjectModel(Package)
    private packageModel: typeof Package,
    private readonly midtransService: MidtransService,
    @InjectModel(InternalTransaction)
    private transactionModel: typeof InternalTransaction,
    private readonly sequelize: Sequelize,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getPaymentMethods() {
    return this.cacheManager.wrap('payment_methods', () =>
      this.paymentMethodModel.findAll(),
    );
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

        const comic = await this.comicModel.findOne({
          where: {
            comic_id: comicId,
          },
        });

        if (!comic) {
          throw new Error('Comic not found');
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

        const author = await this.userModel.findOne({
          where: {
            user_id: comic.user_id,
          },
        });

        if (!author) {
          throw new Error('Author not found');
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

        author.wallet_balance += chapter.price * 1000;

        await author.save({
          transaction: t,
        });

        await this.transactionModel.create(
          {
            user_id: user.user_id,
            comic_id: comicId,
            chapter_id: chapterId,
            amount: 0 - chapter.price * 1000,
            type: 'buy-comic',
            status: 'success',
          },
          {
            transaction: t,
          },
        );

        await this.transactionModel.create(
          {
            user_id: author.user_id,
            comic_id: comicId,
            chapter_id: chapterId,
            amount: chapter.price * 1000,
            type: 'sell-comic',
            status: 'success',
          },
          {
            transaction: t,
          },
        );

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

  async topUpPackage(
    firebaseUid: string,
    packageId: number,
    paymentMethodId: number,
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

        const topupPackage = await this.packageModel.findOne({
          where: {
            package_id: packageId,
          },
        });

        if (!topupPackage) {
          throw new Error('Package not found');
        }
        const paymentMethod = await this.paymentMethodModel.findOne({
          where: {
            method_id: paymentMethodId,
          },
        });

        if (!paymentMethod) {
          throw new Error('Payment method not found');
        }

        const payment = await this.paymentModel.create(
          {
            user_id: user.user_id,
            payment_method_id: paymentMethod.method_id,
            type: 'top-up',
            amount: topupPackage.price,
            amount_to_add: topupPackage.coin,
            status: 'pending',
          },
          {
            transaction: t,
          },
        );

        const midtransResponse =
          await this.midtransService.createPaymentRequest(
            paymentMethod.method_type,
            paymentMethod.method_name,
            topupPackage.price,
            payment.payment_id.toString(),
          );

        payment.payment_response = JSON.stringify(midtransResponse);

        await payment.save({
          transaction: t,
        });

        return midtransResponse;
      });
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllPackages() {
    return this.cacheManager.wrap('all_packages', () =>
      this.packageModel.findAll(),
    );
  }

  async getPaymentById(paymentId: number) {
    return this.cacheManager.wrap(`payment_${paymentId}`, () =>
      this.paymentModel.findOne({
        include: [User, PaymentMethod],
        where: {
          payment_id: paymentId,
        },
      }),
    );
  }

  async giveDonation(
    firebaseUid: string,
    authorId: number,
    amount: number,
    paymentMethodId: number,
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

        const author = await this.userModel.findOne({
          where: {
            user_id: authorId,
          },
        });
        if (!author) {
          throw new Error('Author not found');
        }
        const paymentMethod = await this.paymentMethodModel.findOne({
          where: {
            method_id: paymentMethodId,
          },
        });
        if (!paymentMethod) {
          throw new Error('Payment method not found');
        }
        const payment = await this.paymentModel.create(
          {
            user_id: user.user_id,
            payment_method_id: paymentMethod.method_id,
            type: 'donation',
            amount: amount,
            amount_to_add: 0,
            status: 'pending',
            extra: JSON.stringify({
              author_id: authorId,
              amount: amount,
            }),
          },
          {
            transaction: t,
          },
        );

        const midtransResponse =
          await this.midtransService.createPaymentRequest(
            paymentMethod.method_type,
            paymentMethod.method_name,
            amount,
            payment.payment_id.toString(),
          );
        payment.payment_response = JSON.stringify(midtransResponse);

        await payment.save({
          transaction: t,
        });

        return midtransResponse;
      });

      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async buyChapterFiat(
    firebaseUid: string,
    comicId: number,
    chapterId: number,
    paymentMethodId: number,
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

        const comic = await this.comicModel.findOne({
          where: {
            comic_id: comicId,
          },
        });

        if (!comic) {
          throw new Error('Comic not found');
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

        const author = await this.userModel.findOne({
          where: {
            user_id: comic.user_id,
          },
        });

        if (!author) {
          throw new Error('Author not found');
        }

        author.wallet_balance += chapter.fiat_price;

        await author.save({
          transaction: t,
        });

        const paymentMethod = await this.paymentMethodModel.findOne({
          where: {
            method_id: paymentMethodId,
          },
        });

        if (!paymentMethod) {
          throw new Error('Payment method not found');
        }

        const payment = await this.paymentModel.create(
          {
            user_id: user.user_id,
            payment_method_id: paymentMethod.method_id,
            type: 'purchase',
            amount: chapter.fiat_price,
            status: 'pending',
            extra: JSON.stringify({
              comic_id: comicId,
              chapter_id: chapterId,
            }),
          },
          {
            transaction: t,
          },
        );

        const midtransResponse =
          await this.midtransService.createPaymentRequest(
            paymentMethod.method_type,
            paymentMethod.method_name,
            chapter.fiat_price,
            payment.payment_id.toString(),
          );
        payment.payment_response = JSON.stringify(midtransResponse);
        await payment.save({
          transaction: t,
        });

        return midtransResponse;
      });

      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async handleMidtransNotification(notification: any) {
    const orderId = notification.order_id;
    const statusCode = notification.status_code;
    const grossAmount = notification.gross_amount;
    const signatureKey = notification.signature_key;

    // TODO: validate signature
    // const isValidSignature = await this.midtransService.validateSignature(
    //   signatureKey,
    //   orderId,
    //   statusCode,
    //   grossAmount,
    // );

    // if (!isValidSignature) {
    //   throw new Error('Invalid signature');
    // }

    try {
      const paymentId = parseInt(orderId);

      if (!isNaN(paymentId)) {
        const result = await this.sequelize.transaction(async (t) => {
          const payment = await this.paymentModel.findOne({
            where: {
              payment_id: paymentId,
            },
          });

          if (!payment) {
            throw new Error('Payment not found');
          }

          payment.status = statusCode === '200' ? 'success' : 'failed';

          await payment.save({
            transaction: t,
          });

          if (statusCode === '200') {
            if (payment.type === 'top-up') {
              const user = await this.userModel.findOne({
                where: {
                  user_id: payment.user_id,
                },
              });

              if (!user) {
                throw new Error('User not found');
              }

              user.balance += payment.amount_to_add;

              await user.save({
                transaction: t,
              });

              return user;
            }

            if (payment.type === 'purchase') {
              const extra = JSON.parse(payment.extra);

              const chapter = await this.chapterModel.findOne({
                where: {
                  chapter_id: extra.chapter_id,
                  comic_id: extra.comic_id,
                },
                include: [
                  {
                    model: this.comicModel,
                  },
                ],
              });

              if (!chapter) {
                throw new Error('Chapter not found');
              }

              const author = await this.userModel.findOne({
                where: {
                  user_id: chapter.comic.user_id,
                },
              });

              if (!author) {
                throw new Error('Author not found');
              }

              author.wallet_balance += chapter.fiat_price;

              await author.save({
                transaction: t,
              });

              const userId = payment.user_id;

              await this.transactionModel.create(
                {
                  user_id: userId,
                  comic_id: chapter.comic_id,
                  chapter_id: chapter.chapter_id,
                  amount: chapter.fiat_price,
                  type: 'buy-comic',
                  status: 'success',
                },
                {
                  transaction: t,
                },
              );

              await this.transactionModel.create(
                {
                  user_id: author.user_id,
                  comic_id: chapter.comic_id,
                  chapter_id: chapter.chapter_id,
                  amount: chapter.fiat_price,
                  type: 'sell-comic',
                  status: 'success',
                },
                {
                  transaction: t,
                },
              );

              const access = await this.accessModel.create(
                {
                  user_id: userId,
                  chapter_id: chapter.chapter_id,
                  comic_id: chapter.comic_id,
                  expired_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                },
                {
                  transaction: t,
                },
              );

              return access;
            }

            if (payment.type === 'donation') {
              const extra = JSON.parse(payment.extra);

              const author = await this.userModel.findOne({
                where: {
                  user_id: extra.author_id,
                },
              });

              author.wallet_balance += payment.amount_to_add;

              await author.save({
                transaction: t,
              });

              await this.transactionModel.create(
                {
                  user_id: payment.user_id,
                  amount: payment.amount_to_add,
                  type: 'give-donation',
                  status: 'success',
                },
                {
                  transaction: t,
                },
              );

              await this.transactionModel.create(
                {
                  user_id: author.user_id,
                  amount: payment.amount_to_add,
                  type: 'receive-donation',
                  status: 'success',
                },
                {
                  transaction: t,
                },
              );
            }

            return payment;
          }
        });

        return result;
      }

      return null;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
