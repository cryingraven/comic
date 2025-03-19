import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Access } from 'src/models/access.model';
import { Chapter } from 'src/models/chapter.model';
import { Comic } from 'src/models/comic.model';
import { Page } from 'src/models/page.model';
import { ReadHistory } from 'src/models/readhistory.model';
import { User } from 'src/models/user.model';
import { ReaderController } from './reader.controller';
import { ReaderService } from './reader.service';
import { FirebaseModule } from 'src/modules/firebase/firebase.module';
import { Genre } from 'src/models/genre.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Comic,
      Chapter,
      Page,
      ReadHistory,
      Access,
      Genre,
    ]),
    FirebaseModule,
  ],
  controllers: [ReaderController],
  providers: [ReaderService],
  exports: [ReaderService],
})
export class ReaderModule {
  constructor() {}
}
