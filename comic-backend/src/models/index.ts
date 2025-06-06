import { Access } from './access.model';
import Bank from './bank.model';
import { Banner } from './banner.model';
import { Blog } from './blog.model';
import { Chapter } from './chapter.model';
import { Comic } from './comic.model';
import Comments from './comments.model';
import { Favorites } from './favorites.model';
import { Genre } from './genre.model';
import { Notification } from './notification.model';
import { Package } from './package.model';
import { Page } from './page.model';
import { Payment } from './payment.model';
import { PaymentMethod } from './paymentmethod.model';
import { ReadHistory } from './readhistory.model';
import { InternalTransaction } from './transaction.model';
import { User } from './user.model';
import UserBankAccount from './userbankaccount.model';

export const models = [
  Access,
  Chapter,
  Comic,
  Genre,
  Notification,
  Page,
  Payment,
  Package,
  PaymentMethod,
  ReadHistory,
  User,
  Favorites,
  Comments,
  InternalTransaction,
  Blog,
  Banner,
  Bank,
  UserBankAccount,
];
