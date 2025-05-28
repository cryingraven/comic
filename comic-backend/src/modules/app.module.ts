import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { models } from 'src/models';
import { UserModule } from 'src/features/users/user.module';
import { ReaderModule } from 'src/features/reader/reader.module';
import { PaymentModule } from 'src/features/payment/payment.module';
import { StorageService } from 'src/services/storage.service';
import { CacheModule } from '@nestjs/cache-manager';
import { FileModule } from 'src/features/file/file.module';
import { PublicModule } from 'src/features/public/public.module';
import { CMSModule } from 'src/features/cms/cms.module';
import { timeout } from 'rxjs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      ttl: 5000,
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'mysql', // Or 'mysql', 'sqlite', 'mssql', etc.
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        models, // Array of all models defined in your project
        autoLoadModels: true, // Loads all models automatically.
        synchronize: false,
        pool: {
          max: 10,
          min: 0,
          acquire: 120000,
          idle: 30000,
          evict: 20000,
        },
        dialectOptions: {
          connectTimeout: 60000,
        },
        retry: {
          match: [
            /ETIMEDOUT/,
            /EHOSTUNREACH/,
            /ECONNRESET/,
            /ECONNREFUSED/,
            /ESOCKETTIMEDOUT/,
            /socket ETIMEDOUT/,
            'TimeoutError',
            'SequelizeConnectionAcquireTimeoutError',
          ],
          max: 3,
          backoffBase: 1000,
          backoffExponent: 1.5,
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ReaderModule,
    PaymentModule,
    FileModule,
    PublicModule,
    CMSModule,
  ],
  controllers: [AppController],
  providers: [AppService, StorageService],
  exports: [StorageService],
})
export class AppModule {
  constructor() {}
}
