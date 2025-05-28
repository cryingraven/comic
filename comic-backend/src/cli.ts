import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { Command } from 'commander';
import { createInterface } from 'readline';
import { User } from './models/user.model';
import { Chapter } from './models/chapter.model';
import { Comic } from './models/comic.model';
import { Access } from './models/access.model';
import { Genre } from './models/genre.model';
import { Page } from './models/page.model';
import { Payment } from './models/payment.model';
import { ReadHistory } from './models/readhistory.model';
import { PaymentMethod } from './models/paymentmethod.model';
import { Notification } from './models/notification.model';
import { Sequelize } from 'sequelize';
import { ConfigService } from '@nestjs/config';
import { Favorites } from './models/favorites.model';
import { akoma } from './migrations/akoma';
import { StorageService } from './services/storage.service';
import { akoma_images } from './migrations/akoma-images';
import { koomik } from './migrations/koomik';
import { Package } from './models/package.model';
import { InternalTransaction } from './models/transaction.model';
import { Blog } from './models/blog.model';
import { Banner } from './models/banner.model';
import Comments from './models/comments.model';
import { FirebaseService } from './modules/firebase/firebase.service';
import { migrate_akoma_user } from './migrations/akoma-user';
import { migrate_firebase } from './migrations/migrate-firebase';
import { migrate_koomik_user } from './migrations/koomik-user';
import { akoma_comments } from './migrations/akoma-comments';
import { migrate_koomik_comments } from './migrations/koomik-comments';
import { migrate_koomik_revenue } from './migrations/koomik-revenue';

export async function cli() {
  const app = await NestFactory.create(AppModule);

  const program = new Command();

  program.name('comic').description('CLI to manage comic');
  program.action(async () => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    console.log('Welcome to comic CLI');
    console.log('create - create table');
    console.log('migrate_akoma - migrate akoma data');
    console.log('migrate_koomik - migrate koomik data');
    console.log('migrate_firebase - migrate firebase');
    console.log('migrate_akoma_images - migrate akoma images');
    console.log('migrate_akoma_user - migrate akoma user');
    console.log('migrate_koomik_user - migrate koomik user');
    console.log('migrate_akoma_comments - migrate akoma comments');
    console.log('migrate_koomik_comments - migrate koomik comments');
    console.log('migrate_koomik_revenue - migrate koomik revenue');
    rl.question('What do you want to do? ', async (answer) => {
      const config = app.get(ConfigService);
      const storage = app.get(StorageService);
      const firebase = app.get(FirebaseService);

      const databaseHost = config.get('DATABASE_HOST');
      const databasePort = config.get('DATABASE_PORT');
      const databaseUsername = config.get('DATABASE_USERNAME');
      const databasePassword = config.get('DATABASE_PASSWORD');
      const databaseName = config.get('DATABASE_NAME');

      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: databaseHost,
        port: databasePort,
        username: databaseUsername,
        password: databasePassword,
        database: databaseName,
      });

      const koomikDatabaseHost = config.get('KOOMIK_DATABASE_HOST');
      const koomikDatabasePort = config.get('KOOMIK_DATABASE_PORT');
      const koomikDatabaseUsername = config.get('KOOMIK_DATABASE_USERNAME');
      const koomikDatabasePassword = config.get('KOOMIK_DATABASE_PASSWORD');
      const koomikDatabaseName = config.get('KOOMIK_DATABASE_NAME');

      const koomikSequelize = new Sequelize({
        dialect: 'mysql',
        host: koomikDatabaseHost,
        port: koomikDatabasePort,
        username: koomikDatabaseUsername,
        password: koomikDatabasePassword,
        database: koomikDatabaseName,
      });

      if (answer === 'create') {
        const queryInterface = sequelize.getQueryInterface();
        await queryInterface.createTable('users', User.getAttributes());
        await queryInterface.createTable('comics', Comic.getAttributes());
        await queryInterface.createTable('chapters', Chapter.getAttributes());
        await queryInterface.createTable('accesses', Access.getAttributes());
        await queryInterface.createTable('genres', Genre.getAttributes());
        await queryInterface.createTable('pages', Page.getAttributes());
        await queryInterface.createTable(
          'payment_methods',
          PaymentMethod.getAttributes(),
        );
        await queryInterface.createTable('payments', Payment.getAttributes());
        await queryInterface.createTable(
          'read_histories',
          ReadHistory.getAttributes(),
        );
        await queryInterface.createTable(
          'notifications',
          Notification.getAttributes(),
        );
        await queryInterface.createTable(
          'favorites',
          Favorites.getAttributes(),
        );
        await queryInterface.createTable('packages', Package.getAttributes());
        await queryInterface.createTable(
          'transactions',
          InternalTransaction.getAttributes(),
        );
        await queryInterface.createTable('blogs', Blog.getAttributes());
        await queryInterface.createTable('banners', Banner.getAttributes());
        await queryInterface.createTable('comments', Comments.getAttributes());
        console.log('Table created');
      } else if (answer === 'migrate_akoma') {
        const akomaMongoUri = config.get('AKOMA_MONGO_URI');

        await akoma(sequelize, akomaMongoUri);
      } else if (answer === 'migrate_akoma_images') {
        const akomaMongoUri = config.get('AKOMA_MONGO_URI');
        await akoma_images(storage, akomaMongoUri);
      } else if (answer === 'migrate_koomik') {
        await koomik(sequelize, koomikSequelize);
      } else if (answer === 'migrate_koomik_fb') {
        await migrate_firebase(sequelize, firebase);
      } else if (answer === 'migrate_akoma_user') {
        const akomaMongoUri = config.get('AKOMA_MONGO_URI');
        await migrate_akoma_user(sequelize, akomaMongoUri, firebase);
      } else if (answer === 'migrate_koomik_user') {
        await migrate_koomik_user(sequelize, koomikSequelize, firebase);
      } else if (answer === 'migrate_akoma_comments') {
        const akomaMongoUri = config.get('AKOMA_MONGO_URI');
        await akoma_comments(sequelize, akomaMongoUri);
      } else if (answer === 'migrate_koomik_comments') {
        await migrate_koomik_comments(sequelize, koomikSequelize);
      }else if (answer === 'migrate_koomik_revenue') {
        await migrate_koomik_revenue(sequelize, koomikSequelize);
      }

      rl.close();
    });
  });

  await program.parseAsync(process.argv);
}
