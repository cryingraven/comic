import { Module } from '@nestjs/common';
import { CMSController } from './cms.controler';
import { Comic } from 'src/models/comic.model';
import { SequelizeModule } from '@nestjs/sequelize';
import CMSService from './cms.service';
import { FirebaseModule } from 'src/modules/firebase/firebase.module';
import { Chapter } from 'src/models/chapter.model';
import { User } from 'src/models/user.model';
import { Genre } from 'src/models/genre.model';
import { Page } from 'src/models/page.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Comic, Chapter, Page, User, Genre]),
    FirebaseModule,
  ],
  controllers: [CMSController],
  providers: [CMSService],
})
export class CMSModule {}
