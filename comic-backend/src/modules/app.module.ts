import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { models } from 'src/models';
import { UserModule } from 'src/features/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
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
    FirebaseModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}
