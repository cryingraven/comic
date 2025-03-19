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
        synchronize: process.env.NODE_ENV === 'development', // Careful with this in production! Automatically creates tables based on models.
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ReaderModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService, StorageService],
  exports: [StorageService],
})
export class AppModule {
  constructor() {}
}
